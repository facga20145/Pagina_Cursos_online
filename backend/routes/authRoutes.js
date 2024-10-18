
const express = require("express");
const jwt = require("jsonwebtoken"); 
const authController = require("../controllers/authController.js");
const router = express.Router();

// Ruta para login
router.post("/login", authController.login);

// Ruta para refresh token
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "No se proporcionó el refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Refresh token inválido" });

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15s" });
    const newExpirationTime = Math.floor(Date.now() / 1000) + 15;
    res.json({ accessToken: newAccessToken, expirationTime: newExpirationTime });
  });
});

// Ruta para obtener datos del usuario autenticado
router.get("/userdata", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token de acceso no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    res.json({ id: user.id });
  });
});

// Ruta para registro de usuario
router.post("/register", authController.register);

module.exports = router;