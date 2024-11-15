const connection = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para generar el token de acceso
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15s",  // Tiempo de expiración del accessToken (15 minutos)
  });
};

// Función para generar el token de refresco
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",  // Tiempo de expiración del refreshToken (7 días)
  });
};

// Función para formatear la fecha a 'YYYY-MM-DD'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Fecha inválida:", dateString);
    return null; // O algún valor por defecto en caso de que sea necesario
  }
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes con dos dígitos
  const day = ('0' + date.getDate()).slice(-2); // Día con dos dígitos
  return `${year}-${month}-${day}`;
};


// Controlador de registro de usuario
exports.register = async (req, res) => {
  console.log("Iniciando registro de usuario"); // Para ver si el código llega aquí
console.log(req.body); // Para verificar los datos que llegan al servidor

  const { nombre, apellido, fechaNacimiento, genero, correo, contrasena } = req.body;

  // Validar si el correo ya existe en la base de datos
  const queryCheckEmail = "CALL consultarCliente (?)";
  connection.query(queryCheckEmail, [correo], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }
     // Mostrar el resultado de la consulta para ver su estructura
    console.log("Resultado de la consulta de correo:", [correo]);

   // Verificar si el correo existe
   const correoExists = results[0] && results[0].length > 0;
   if (correoExists) {
     console.log("El correo ya está registrado");
     return res.status(400).json({ message: "El correo ya está registrado" });
   }else{
    console.log("El correo no está registrado");
   }

   // Convierte y verifica la fecha
   const formattedDate = formatDate(fechaNacimiento);
   console.log("La fecha es:", fechaNacimiento);
   if (!formattedDate) {
     return res.status(400).json({ message: "Fecha de nacimiento inválida" });
   }

    // Cifrar la contraseña antes de guardarla
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(contrasena, 10);
    } catch (error) {
      console.error("Error al hashear la contraseña:", error);
      return res.status(500).json({ message: "Error al procesar la contraseña" });
    }
    
    // Insertar el nuevo usuario en la base de datos con el rol 'usuario'
    const queryInsertarCliente = "CALL InsertarCliente(?, ?, ?, ?, ?, ?)";

    // Mostrar los valores que se van a insertar (para debug)
    console.log("Valores que se van a insertar:", {
      nombre,
      apellido,
      correo,
      hashedPassword,
      genero,
      fechaNacimiento: formattedDate,
    });

    //Realiza la conexión y la consulta a la base de datos
    connection.query(
      queryInsertarCliente,
      [nombre, apellido, formattedDate, genero, correo, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error al registrar al usuario:", err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        // Usuario registrado con éxito, ahora generamos los tokens
        const newUser = { id: result.insertId, Correo };
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Devolver los tokens al cliente
        return res.status(201).json({
          message: "Usuario registrado exitosamente",
          accessToken,
          refreshToken,
        });
      }
    );
  });
};

// Controlador de login de usuario
exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  console.log("Datos recibidos del cliente:", { correo, contrasena });

  // Consulta a la base de datos para verificar si el usuario existe
  const query = "CALL loginCliente(?)";
  connection.query(query, [correo], async (err, results) => {
      if (err) {
          console.error("Error en la consulta a la base de datos:", err);
          return res.status(500).json({ message: "Error en el servidor" });
      }

      //Depuración
      console.log("Resultado de la consulta a la base de datos:", results);

      //Verifica el usuario ingresado con el de la bd
      if (!results[0] || results[0].length === 0) {
          console.log("Usuario no encontrado en la base de datos.");
          return res.status(401).json({ message: "Usuario no encontrado o contraseña incorrecta" });
      }

      // Si encuentra el usuario, guarda todo en user
      const user = results[0][0];

      //Depuraciones (no interfiere)
      console.log("Usuario encontrado:", user);
      console.log("Contraseña proporcionada:", contrasena);
      console.log("Hash en la base de datos:", user.Contrasena);

      
      // Comparar la contraseña cifrada
      const isPasswordValid = await bcrypt.compare(contrasena, user.Contrasena);
      if (!isPasswordValid) {
          console.log("Contraseña incorrecta para el usuario:", correo);
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Verificar si la cuenta está activa
      const isActive = Boolean(user.Estado && user.Estado[0]);
      if (!isActive){
        console.log("La cuenta está inactiva");
        return res.status(403).json({message : "La cuenta esta inactiva"});
      }

      // Si todo está correcto, generar tokens

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      console.log("Tokens generados para el usuario:", { accessToken, refreshToken });

      // Decodificar el token para obtener el tiempo de expiración
      const decodedAccessToken = jwt.decode(accessToken);
      const expirationTime = decodedAccessToken.exp;

      // Devolver los tokens y el tiempo de expiración al cliente
      return res.json({
          user: {
              id: user.id,
              nombre: user.nombre,
              apellido: user.apellido,
              fechaNacimiento: user.fecha_nacimiento,
              genero: user.genero,
              correo: user.correo,
          },
          accessToken,
          refreshToken,
          expirationTime,
      });
  });
};
