const express = require("express");
const router = express.Router();
const { getCategories, getCourses, getCoursesByCategory } = require("../controllers/courseController");

// Rutas para cursos y categorías
router.get("/categorias", getCategories); // Obtener todas las categorías
router.get("/", getCourses); // Obtener todos los cursos
router.get("/categoria/:idCategoria", getCoursesByCategory); // Obtener cursos por categoría

module.exports = router;
