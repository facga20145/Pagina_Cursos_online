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
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes con dos dígitos
  const day = ('0' + date.getDate()).slice(-2); // Día con dos dígitos
  return `${year}-${month}-${day}`;
};

// Controlador de registro de usuario
exports.register = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, email, password } = req.body;

  // Validar si el correo ya existe en la base de datos
  const queryCheckEmail = "SELECT * FROM users WHERE email = ?";
  connection.query(queryCheckEmail, [email], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const formattedDate = formatDate(fecha_nacimiento); // Formatear la fecha

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos con el rol 'usuario'
    const queryInsertUser = `
      INSERT INTO users (nombre, apellido, fecha_nacimiento, genero, email, contrasena, rol) 
      VALUES (?, ?, ?, ?, ?, ?, 'usuario')
    `;

    // Mostrar los valores que se van a insertar (para debug)
    console.log("Valores que se van a insertar:", {
      nombre,
      apellido,
      email,
      hashedPassword,
      genero,
      fecha_nacimiento: formattedDate,
    });

    connection.query(
      queryInsertUser,
      [nombre, apellido, formattedDate, genero, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error al registrar al usuario:", err);
          return res.status(500).json({ message: "Error en el servidor" });
        }

        // Usuario registrado con éxito, ahora generamos los tokens
        const newUser = { id: result.insertId, email };
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