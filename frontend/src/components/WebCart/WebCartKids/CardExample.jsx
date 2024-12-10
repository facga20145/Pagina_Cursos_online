import React, { useState, useEffect } from 'react';
import './Card.css';

export default function CardList({ selectedCategory }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:4000/api/cursos/categoria/${selectedCategory}`
      : "http://localhost:4000/api/cursos";

    fetch(url)
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error("Error al cargar cursos:", error));
  }, [selectedCategory]);

  return (
    <div className="cardList">
      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course.idCurso} className="card">
            <img
              src={`http://localhost:4000/${course.imagen}`}
              alt={course.nombre_curso}
            />
            <h3>{course.nombre_curso}</h3>
            <p>{course.descripcion}</p>
            <p className="price">{`S/ ${course.precio}`}</p>
            <button>INGRESAR</button>
          </div>
        ))
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  );
}
