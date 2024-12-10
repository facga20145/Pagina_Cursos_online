const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require('./routes/paymentRoutes'); // Importamos las rutas de pago
const authRoutes = require('./routes/authRoutes'); // Ajusta la ruta si es diferente
const courseRoutes = require("./routes/courseRoutes"); // Importar las rutas de cursos
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Importar y usar las rutas de autenticación
app.use("/api/auth", authRoutes);
app.use('/backend', paymentRoutes); 
app.use("/api/cursos", courseRoutes);


// Hacer accesible la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
