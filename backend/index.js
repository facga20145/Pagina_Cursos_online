const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Importar rutas
const paymentRoutes = require('./routes/paymentRoutes'); // Rutas de pagos
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const courseRoutes = require("./routes/courseRoutes"); // Rutas de cursos
const scholarshipRoutes = require("./routes/scholarshipRoutes"); // Rutas de becas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos codificados en URL
app.use(require("express-fileupload")()); // Para manejar archivos subidos

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Rutas principales
app.use("/api/auth", authRoutes); // Autenticación
app.use("/backend", paymentRoutes); // Pagos
app.use("/api/cursos", courseRoutes); // Cursos
app.use("/api/scholarships", scholarshipRoutes); // Becas

// Rutas estáticas para archivos
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Ruta para servir archivos en "uploads"
app.use("/uploads/documents", express.static(path.join(__dirname, "../uploads/documentos"))); // Ruta para documentos específicos

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
