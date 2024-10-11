import React, { useState } from 'react';
import './EditCourse.css';

export default function EditCourse({ course }) {
  const [videos, setVideos] = useState([]); // Lista de videos subidos

  const handleVideoUpload = (e) => {
    const uploadedVideos = Array.from(e.target.files);
    setVideos([...videos, ...uploadedVideos]);
  };

  return (
    <div className="edit-course">
      <h2>Editar Curso: {course.name}</h2>

      <div className="upload-section">
        <label>Subir Videos del Curso:</label>
        <input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
      </div>

      <div className="videos-list">
        <h3>Videos Subidos</h3>
        {videos.length === 0 ? <p>No hay videos subidos.</p> : (
          <ul>
            {videos.map((video, index) => (
              <li key={index}>{video.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
