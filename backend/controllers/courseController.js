const connection = require("../config/db.js");

// Obtener todas las categorías
exports.getCategories = (req, res) => {
  const query = "SELECT idCategoria, NombreCategoria FROM categoria";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener categorías:", err);
      return res.status(500).json({ message: "Error al obtener categorías." });
    }
    res.json(results);
  });
};

// Obtener todos los cursos
exports.getCourses = (req, res) => {
  const query = `
    SELECT idCurso, nombre_curso, descripcion, precio, idCategoria
    FROM curso
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener cursos:", err);
      return res.status(500).json({ message: "Error al obtener cursos." });
    }
    res.json(results);
  });
};

// Obtener cursos por categoría
exports.getCoursesByCategory = (req, res) => {
  const { idCategoria } = req.params;
  const query = `
    SELECT idCurso, nombre_curso, descripcion, precio
    FROM curso
    WHERE idCategoria = ?
  `;
  connection.query(query, [idCategoria], (err, results) => {
    if (err) {
      console.error("Error al obtener cursos por categoría:", err);
      return res.status(500).json({ message: "Error al obtener cursos por categoría." });
    }
    res.json(results);
  });
};
