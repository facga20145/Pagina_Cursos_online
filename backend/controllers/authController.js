const connection = require('../config/db.js'); // Importa la conexión a la base de datos
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15s' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Controlador de login
exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log('Datos recibidos:', { username, password }); // Log para ver los datos recibidos

  // Consulta a la base de datos para verificar si el usuario existe
  const query = 'SELECT * FROM users WHERE email = ? AND contrasena = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    console.log('Resultados de la consulta:', results); // Log para ver el resultado de la consulta

    if (results.length > 0) {
      const user = results[0]; // El usuario encontrado en la base de datos

      console.log('Usuario encontrado:', user); // Log para ver el usuario encontrado

      // Generar tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Decodificar el token para obtener el tiempo de expiración
      const decodedAccessToken = jwt.decode(accessToken);
      const expirationTime = decodedAccessToken.exp; // Tiempo de expiración en formato UNIX (segundos)

      // Devolver los tokens y el tiempo de expiración al cliente
      return res.json({
        accessToken,
        refreshToken,
        expirationTime, // Incluir el tiempo de expiración
      });
    } else {
      // Si no se encontró al usuario o las credenciales son incorrectas
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  });
};
