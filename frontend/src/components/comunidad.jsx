import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import "./comunidad.css";

const Comunidad = () => {
    // Ejemplo de datos de usuarios con más cursos o certificados
    const ranking = [
      { nombre: 'Juan Pérez', cursos: 10, certificados: 8, img: 'perfil1.png' },
      { nombre: 'María García', cursos: 9, certificados: 7, img: 'perfil2.png' },
      { nombre: 'Carlos Ramírez', cursos: 8, certificados: 6, img: 'perfil3.png' },
    ];

    // Función que redirige al login
     //   const handleForoClick = () => {
     //   navigate('/foro'); 
    //};
  
  
    return (
      <section id="comunidad" className="community-section">
        {/* Sección de Eventos */}
        <div className="community-block eventos">
          <h2 className="community-block-title">Eventos Virtuales</h2>
          <p className="community-block-description">Aprende online y participa desde cualquier lugar.</p>
  
          <div className="event-row">
            <div className="event-card">
              <p><strong>AHORA | 16:00</strong></p>
              <p>Platzi Live: Desarrollo e Ingeniería</p>
            </div>
            <div className="event-card">
              <p><strong>17 OCTUBRE | 16:00</strong></p>
              <p>Platzi Live: Desarrollo e Ingeniería</p>
            </div>
            <div className="event-card">
              <p><strong>24 OCTUBRE | 16:00</strong></p>
              <p>Platzi Live: Innovación y Startups</p>
            </div>
          </div>
        </div>
  
        {/* Sección del Foro */}
        <div className="community-block foro">
          <h2 className="community-block-title">Lo mejor del foro</h2>
          <div className="foro-posts">
            <div className="foro-post">
              <div className="post-info">
                <p className="post-user">Saul Rivera</p>
                <p className="post-content">Diseñar web en Web Flow</p>
              </div>
              <div className="post-stats">
                <span>1 ❤️  0 💬</span>
              </div>
            </div>
  
            <div className="foro-post">
              <div className="post-info">
                <p className="post-user">Cristian Diaz</p>
                <p className="post-content">Microservicios</p>
              </div>
              <div className="post-stats">
                <span>2 ❤️  1 💬</span>
              </div>
            </div>
  
            <div className="foro-post">
              <div className="post-info">
                <p className="post-user">Manuel Dautt</p>
                <p className="post-content">¿Qué pasó con el curso de Docker?</p>
              </div>
              <div className="post-stats">
                <span>1 ❤️  2 💬</span>
              </div>
            </div>
          </div>
          <a href="/foro" className="foro-link">Ver foro completo</a>
        </div>
  
        {/* Sección del Ranking */}
        <div className="community-block ranking">
          <h2 className="community-block-title">Top 3 en Cursos/Certificados</h2>
          <div className="ranking-podium">
            {ranking.map((usuario, index) => (
              <div key={index} className={`podium-place place-${index + 1}`}>
                <p>{usuario.nombre}</p>
                <p>{usuario.cursos} Cursos / {usuario.certificados} Certificados</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Comunidad;