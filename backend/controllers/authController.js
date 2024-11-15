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

    connection.query(
      queryInsertarCliente,
      [nombre, apellido, formattedDate, genero, correo, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error al registrar al usuario:", err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        // Usuario registrado con éxito, ahora generamos los tokens
        const newUser = { id: result.insertId, correo };
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
  const { email, password } = req.body; // Cambiar 'username' a 'email'

  console.log("Datos recibidos:", { email, password }); // Log para ver los datos recibidos

  // Consulta a la base de datos para verificar si el usuario existe
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      const user = results[0]; // El usuario encontrado en la base de datos
      console.log("Usuario encontrado:", user); // Log para ver el usuario encontrado

      // Comparar la contraseña cifrada
      const isPasswordValid = await bcrypt.compare(password, user.contrasena);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Generar tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Decodificar el token para obtener el tiempo de expiración
      const decodedAccessToken = jwt.decode(accessToken);
      const expirationTime = decodedAccessToken.exp; // Tiempo de expiración en formato UNIX (segundos)

      // Devolver los tokens y el tiempo de expiración al cliente
      return res.json({
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          fechaNacimiento: user.fecha_nacimiento, // Cambia a 'fecha_nacimiento'
          genero: user.genero,
          email: user.email,
        },
        accessToken,
        refreshToken,
        expirationTime, // Incluir el tiempo de expiración
      });
    } else {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }
  });
};