import React, { useState, useEffect } from 'react';
import './Card.css';

export default function CardList({ selectedCategory }) {
  const [courses, setCourses] = useState([]);

  // Cargar cursos desde el backend
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
      {courses.map(course => (
        <div key={course.idCurso} className="card">
          <img src={course.enlace} alt={course.nombre_curso} />
          <h3>{course.nombre_curso}</h3>
          <p>{course.descripcion}</p>
          <p>{`S/ ${course.precio}`}</p>
        </div>
      ))}
    </div>
  );
}
