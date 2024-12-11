const connection = require("../config/db.js");

// Variable en memoria para almacenar los correos validados
let validatedEmails = [];

exports.validateUserSubscription = async (req, res) => {
  const { correo, memberEmails } = req.body;

  console.log("Iniciando validación de correos...");
  console.log("Correo principal:", correo);
  console.log("Correos de miembros:", memberEmails);

  try {
    // Validar si el usuario principal tiene una suscripción activa
    const queryUser = `
      SELECT u.idUsuario, u.Correo, s.estado
      FROM usuario u
      LEFT JOIN suscripción s ON u.idUsuario = s.idUsuario
      WHERE u.Correo = ? AND (s.estado IS NULL OR s.estado = 0)
    `;
    
    connection.query(queryUser, [correo], async (err, results) => {
      if (err) {
        console.error("Error en la consulta de usuario:", err);
        return res.status(500).json({ message: "Error en la consulta de usuario." });
      }

      const user = results[0];
      if (!user) {
        console.log("El usuario no existe:", correo);
        return res.status(404).json({ message: "El usuario no existe." });
      }

      if (user.estado === 1) {
        console.log("El usuario ya tiene una suscripción activa:", correo);
        return res.status(400).json({ message: "El usuario ya tiene una suscripción activa." });
      }

      console.log("Validación del usuario principal completada correctamente.");

      // Validar los correos de los miembros
      if (memberEmails && memberEmails.length > 0) {
        console.log("Validando correos de los miembros...");
        const memberQueries = memberEmails.map(email => {
          return new Promise((resolve, reject) => {
            const queryMember = `
              SELECT u.idUsuario, u.Correo, s.estado
              FROM usuario u
              LEFT JOIN suscripción s ON u.idUsuario = s.idUsuario
              WHERE u.Correo = ? AND (s.estado IS NULL OR s.estado = 0)
            `;
            connection.query(queryMember, [email], (err, memberResults) => {
              if (err) {
                console.error("Error en la consulta de miembro:", err);
                reject({ message: "Error al validar los correos de los miembros." });
              }

              if (!memberResults[0]) {
                reject({ message: `El correo ${email} no está registrado o tiene una suscripción activa.` });
              } else {
                const member = memberResults[0];

                if (member.estado === 1) {
                  reject({ message: `El correo ${email} tiene una suscripción activa.` });
                } else {
                  resolve(); // Miembro sin suscripción activa
                }
              }
            });
          });
        });

        // Esperar a que todas las consultas de los miembros se completen
        try {
          await Promise.all(memberQueries);
          console.log("Correos de miembros validados correctamente.");
        } catch (error) {
          console.error("Error en la validación de miembros:", error);
          return res.status(400).json(error); // Error si algún miembro tiene suscripción activa
        }
      }

      // Almacenar temporalmente los correos validados
      validatedEmails = [correo, ...memberEmails];
      console.log("Correos validados correctamente y almacenados temporalmente:", validatedEmails);

      return res.json({ message: "Los correos están validados correctamente." });
    });
  } catch (error) {
    console.error("Error al procesar la validación:", error);
    res.status(500).json({ message: "Error al validar los correos." });
  }
};

// Simulación de pago y registro en base de datos
// Backend: Insertar solo pago (sin suscripción)
exports.processPayment = async (req, res) => {
  const { paymentMethod, plan, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "El ID del usuario es requerido." });
  }

  if (validatedEmails.length === 0) {
    return res.status(400).json({ message: "No se han validado los correos." });
  }

  const paymentType = paymentMethod === "Tarjeta" ? 1 : 2;

  connection.beginTransaction(err => {
    if (err) {
      console.error("Error iniciando transacción:", err);
      return res.status(500).json({ message: "Error al iniciar la transacción." });
    }

    // Insertar el pago
    const paymentQuery = `INSERT INTO pago (idTipoPago, idUsuario, idCurso, fechaPago) VALUES (?, ?, NULL, NOW())`;
    connection.query(paymentQuery, [paymentType, userId], (err, paymentResult) => {
      if (err) {
        return connection.rollback(() => {
          console.error("Error al registrar el pago:", err);
          res.status(500).json({ message: "Error al registrar el pago." });
        });
      }

      const paymentId = paymentResult.insertId; // Recuperar el último ID insertado

      // Generar las suscripciones para el usuario principal y los miembros
      const subscriptionQuery = `
        INSERT INTO suscripción (idPago, idPlanEstudio, idUsuario, fechaInicio, fechaFin, estado)
        VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 1)
      `;

      const subscriptionPromises = validatedEmails.map(email => {
        return new Promise((resolve, reject) => {
          // Recuperar el ID del usuario por correo
          const userQuery = `SELECT idUsuario FROM usuario WHERE Correo = ?`;
          connection.query(userQuery, [email], (err, userResults) => {
            if (err || userResults.length === 0) {
              console.error(`Error al obtener el ID del usuario para el correo ${email}:`, err);
              return reject(`No se pudo encontrar el usuario para el correo ${email}`);
            }

            const userId = userResults[0].idUsuario;

            // Insertar la suscripción
            connection.query(subscriptionQuery, [paymentId, 2, userId], (err, subscriptionResult) => {
              if (err) {
                console.error(`Error al insertar suscripción para el usuario ${userId}:`, err);
                return reject(`Error al insertar suscripción para el usuario con correo ${email}`);
              }
              resolve();
            });
          });
        });
      });

      // Ejecutar todas las inserciones de suscripciones
      Promise.all(subscriptionPromises)
        .then(() => {
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                console.error("Error al finalizar la transacción:", err);
                res.status(500).json({ message: "Error al finalizar el proceso." });
              });
            }
            res.status(200).json({
              message: "Pago y suscripciones registrados exitosamente.",
              redirect: "/", // URL para redirigir al cliente
            });
          });
        })
        .catch(error => {
          connection.rollback(() => {
            console.error("Error en el proceso de suscripciones:", error);
            res.status(500).json({ message: "Error al registrar las suscripciones." });
          });
        });
    });
  });
};

// Registrar pago para un curso individual
exports.processCoursePayment = async (req, res) => {
  const { userId, cartItems, idTipoPago, cardDetails, validationCode } = req.body;

  if (!userId || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Datos insuficientes para procesar el pago." });
  }

  if (!idTipoPago || (idTipoPago !== 1 && idTipoPago !== 2)) {
    return res.status(400).json({ message: "Método de pago no válido." });
  }

  try {
    // Registrar un pago por cada curso en el carrito
    for (const item of cartItems) {
      const query = `
        INSERT INTO pago (idUsuario, idCurso, idTipoPago, fechaPago) 
        VALUES (?, ?, ?, NOW())
      `;
      await new Promise((resolve, reject) => {
        connection.query(query, [userId, item.id, idTipoPago], (err, results) => {
          if (err) {
            console.error("Error al registrar el pago:", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }

    res.status(200).json({ message: "Pago procesado exitosamente." });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ message: "Error al procesar el pago." });
  }
};

