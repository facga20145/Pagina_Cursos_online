const connection = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para generar el token de acceso
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",  // Tiempo de expiración del accessToken (15 minutos)
  });
};

// Función para generar el token de refresco
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",  // Tiempo de expiración del refreshToken (7 días)
  });
};

// Función para el registro de usuario
exports.register = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, email, password } = req.body;

  console.log("Fecha de nacimiento recibida en el backend:", fecha_nacimiento);

  if (!fecha_nacimiento) {
    return res.status(400).json({ message: "La fecha de nacimiento es obligatoria" });
  }

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

    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos con el rol 'usuario'
    const queryInsertUser = `
      INSERT INTO users (nombre, apellido, fecha_nacimiento, genero, email, contrasena, rol) 
      VALUES (?, ?, ?, ?, ?, ?, 'usuario')
    `;

    connection.query(
      queryInsertUser,
      [nombre, apellido, fecha_nacimiento, genero, email, hashedPassword],
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

// Función para el login de usuario
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.contrasena);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Devolver los tokens al cliente
    return res.json({
      accessToken,
      refreshToken,
    });
  });
};
