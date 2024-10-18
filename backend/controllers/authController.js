const connection = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para generar el token de acceso
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15s",
  });
};

// Función para generar el token de refresco
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Formatear la fecha para que sea compatible con el formato que espera MySQL
const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/'); // Dividimos la fecha en componentes día, mes, año
  return ${year}-${month}-${day}; // Retornamos la fecha en el formato aaaa-mm-dd
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
    
    const formattedDate = formatDate(fecha_nacimiento); // Asegura que la fecha esté en el formato correcto para MySQL
    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos con el rol 'usuario'
    const queryInsertUser = `
      INSERT INTO users (nombre, apellido, fecha_nacimiento, genero, email, contrasena, rol) 
      VALUES (?, ?, ?, ?, ?, ?, 'usuario')
    `;
    
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

        // Devolver una respuesta exitosa al cliente
        return res.status(201).json({ message: "Usuario registrado exitosamente" });
      }
    );
  });
};

// Controlador de login
exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("Datos recibidos:", { username, password });

  // Consulta a la base de datos para verificar si el usuario existe
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      const user = results[0]; // El usuario encontrado en la base de datos
      console.log("Usuario encontrado:", user);

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
          fechaNacimiento: user.fecha_nacimiento,
          genero: user.genero,
          email: user.email,
        },
        accessToken,
        refreshToken,
        expirationTime,
      });
    } else {
      return res.status(401).json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }
  });
};