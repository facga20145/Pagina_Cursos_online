const connection = require("../config/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función para el registro
exports.register = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, email, password } = req.body;
  console.log("Fecha de nacimiento recibida en el backend:", fecha_nacimiento);

  if (!fecha_nacimiento) {
    return res.status(400).json({ message: "La fecha de nacimiento es obligatoria" });
  }

  const queryCheckEmail = "SELECT * FROM users WHERE email = ?";
  connection.query(queryCheckEmail, [email], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
        return res.status(201).json({ message: "Usuario registrado exitosamente" });
      }
    );
  });
};

// Función para el login (asegúrate de que esta función esté definida)
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

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return res.json({
      accessToken,
      refreshToken,
    });
  });
};
