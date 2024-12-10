const express = require("express");
const router = express.Router();
const { getCategories, getCourses, getCoursesByCategory, getCourseDetails } = require("../controllers/courseController");

// Rutas para cursos y categorías
router.get("/categorias", getCategories); // Obtener todas las categorías
router.get("/", getCourses); // Obtener todos los cursos
router.get("/categoria/:idCategoria", getCoursesByCategory); // Obtener cursos por categoría
// Ruta para obtener detalles de un curso específico
router.get("/:idCurso", getCourseDetails);
module.exports = router;
