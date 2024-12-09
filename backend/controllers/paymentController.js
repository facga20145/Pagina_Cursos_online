const connection = require("../config/db.js");

// Controlador para validar usuario y suscripción
exports.validateUserSubscription = async (req, res) => {
  const { correo, memberEmails } = req.body;

  try {
    // 1. Validar si el usuario principal tiene una suscripción activa
    const queryUser = `
      SELECT u.idUsuario, u.Correo, s.estado
      FROM usuario u
      LEFT JOIN suscripción s ON u.idUsuario = s.idUsuario
      WHERE u.Correo = ? AND (s.estado IS NULL OR s.estado = 0)
    `; // Se busca el usuario y se verifica si tiene suscripción activa

    connection.query(queryUser, [correo], async (err, results) => {
      if (err) {
        console.error("Error en la consulta de usuario:", err);
        return res.status(500).json({ message: "Error en el servidor" });
      }

      const user = results[0]; // Suponiendo que solo hay un usuario con ese correo
      if (!user) {
        return res.status(404).json({ message: "El usuario no existe." });
      }

      // Si tiene una suscripción activa (estado = 1), no se puede continuar
      if (user.estado === 1) {
        return res.status(400).json({ message: "El usuario ya tiene una suscripción activa." });
      }

      // 2. Validar los correos de los miembros y sus suscripciones
      if (memberEmails && memberEmails.length > 0) {
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
                reject({ message: "Error al validar los correos de los miembros" });
              }

              if (!memberResults[0]) {
                reject({ message: `El correo ${email} no está registrado o tiene una suscripción activa.` });
              } else {
                const member = memberResults[0];

                // Si el miembro tiene una suscripción activa (estado = 1), no puede continuar
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
        } catch (error) {
          return res.status(400).json(error); // Devuelve el error si algún miembro tiene suscripción activa
        }
      }

      // Si todo está bien, responde con éxito
      return res.json({ message: "Los correos están validados correctamente." });
    });
  } catch (error) {
    console.error("Error al procesar la validación:", error);
    res.status(500).json({ message: "Error al validar los correos." });
  }
};
