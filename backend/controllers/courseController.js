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
    SELECT idCurso, nombre_curso, descripcion, precio, idCategoria, imagen
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
    SELECT idCurso, nombre_curso, descripcion, precio, imagen
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

// Obtener detalles de un curso por su ID
exports.getCourseDetails = (req, res) => {
  const { idCurso } = req.params;
  const query = `
    SELECT idCurso, nombre_curso, descripcion, precio, enlace, imagen
    FROM curso
    WHERE idCurso = ?
  `;
  connection.query(query, [idCurso], (err, results) => {
    if (err) {
      console.error("Error al obtener los detalles del curso:", err);
      return res.status(500).json({ message: "Error al obtener los detalles del curso." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    const course = results[0];

    // Transformar el enlace de YouTube si es necesario
    if (course.enlace.includes("watch?v=")) {
      course.enlace = course.enlace.replace("watch?v=", "embed/");
    }

    res.json(course);
  });
};

