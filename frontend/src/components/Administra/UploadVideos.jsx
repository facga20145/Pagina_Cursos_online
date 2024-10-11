import React, { useState } from 'react';
import './UploadVideos.css';

function UploadVideos() {
  const [video, setVideo] = useState(null);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video) {
      console.log('Subiendo video:', video);
      // Aquí iría la lógica para subir el video a un servidor o almacenamiento en la nube
    } else {
      alert('Por favor selecciona un video.');
    }
  };

  return (
    <div className="upload-videos">
      <h2>Subir Videos para los Cursos</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Subir Video</button>
      </form>
    </div>
  );
}

export default UploadVideos;
