import { useState } from 'react';
import './ManageCourses.css';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      name: e.target.name.value,
      description: e.target.description.value,
      image: e.target.image.files[0]
    };
    setCourses([...courses, newCourse]);
    e.target.reset(); 
  };

  const handleEditCourse = (index) => {
    alert(`Editar curso: ${courses[index].name}`);
  };

  return (
    <div className="manage-courses-container">
      <form className="manage-courses-form" onSubmit={handleAddCourse}>
        <h2>Gestión de Cursos</h2>
        <label>Nombre del Curso:</label>
        <input type="text" name="name" required />

        <label>Descripción:</label>
        <textarea name="description" rows="4" required></textarea>

        <label>Subir Imagen del Curso:</label>
        <input type="file" name="image" accept="image/*" required />

        <button type="submit">Agregar Curso</button>
      </form>

      <div className="courses-created">
        <h3>Cursos Creados</h3>
        {courses.length === 0 ? (
          <p className="no-courses">No hay cursos creados.</p>
        ) : (
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                <img
                  src={URL.createObjectURL(course.image)}
                  alt={course.name}
                  className="course-image"
                />
                <div className="course-info">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <button onClick={() => handleEditCourse(index)} className="edit-btn">Editar Curso</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
