import React, { useState } from 'react';
import './DemoLandingPage.css';
import floatingSkull from './images/Ded.png'; // Imagen del esqueleto flotante
import backpackImage from './images/backpack.png';
import giftImage from './images/gift.png';
import championImage from './images/champion.png';
import scholarshipImage from './images/scholarship.png';
import planImage1 from './images/Logo-rv.png'; // Agregar imágenes a cada plan
import planImage2 from './images/Logo-rv.png';
import planImage3 from './images/Logo-rv.png';

export default function DemoLandingPage() {
  // Estado para el quizz
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleQuizSubmit = (answer) => {
    setQuizAnswer(answer);
    setShowQuizResult(true);
  };

  return (
    <div className="demoLandingContainer">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>RGB Gamer Academy</h1>
        </div>
        <nav>
          <a href="/cursos">Cursos</a>
          <a href="/login">Login</a>
          <a href="/register">Registro</a>
        </nav>
      </header>

      {/* Sección Principal con Imagen Flotante */}
      <section className="heroSection">
        <div className="heroText">
          <h2>¡Domina la programación y crea tus propios videojuegos!</h2>
          <p>
            Únete a la comunidad gamer más emocionante y aprende habilidades tecnológicas mientras te diviertes. ¡Inscríbete hoy y empieza a crear!
          </p>
          <a href="/cursos" className="rgbButton">
            <span>Explora nuestros cursos</span>
          </a>
        </div>
        <img src={floatingSkull} alt="Flotante" className="floatingImage" />
      </section>

      {/* Cursos Destacados */}
      <section className="coursesSection">
        <h3>Cursos Destacados</h3>
        <div className="coursesGrid">
          <div className="courseItem">
            <img src={backpackImage} alt="Curso 1" className="courseImage" />
            <p>Curso 1</p>
          </div>
          <div className="courseItem">
            <img src={giftImage} alt="Curso 2" className="courseImage" />
            <p>Curso 2</p>
          </div>
          <div className="courseItem">
            <img src={championImage} alt="Curso 3" className="courseImage" />
            <p>Curso 3</p>
          </div>
          <div className="courseItem">
            <img src={scholarshipImage} alt="Curso 4" className="courseImage" />
            <p>Curso 4</p>
          </div>
        </div>
      </section>

      {/* Sección de Quizz */}
      <section className="quizSection">
        <h3>¡Participa en el Quizz!</h3>
        <p>¿Cuál de los siguientes cursos te interesa más?</p>
        <div className="quizOptions">
          <button onClick={() => handleQuizSubmit('Curso 1')}>Curso 1</button>
          <button onClick={() => handleQuizSubmit('Curso 2')}>Curso 2</button>
          <button onClick={() => handleQuizSubmit('Curso 3')}>Curso 3</button>
          <button onClick={() => handleQuizSubmit('Curso 4')}>Curso 4</button>
        </div>
        {showQuizResult && (
          <div className="quizResult">
            <p>¡Has seleccionado: {quizAnswer}!</p>
          </div>
        )}
      </section>

      {/* Planes de Estudio */}
      <section className="plansSection">
        <h3>Elige tu plan</h3>
        <div className="planCards">
          <div className="planCard">
            <img src={planImage1} alt="Plan 1" className="planImage" />
            <h4>Plan gratuito</h4>
            <p>Comienza tu viaje en el mundo gamer con acceso gratuito a nuestros cursos básicos.</p>
            <button className="planButton">Comienza ahora</button>
          </div>
          <div className="planCard">
            <img src={planImage2} alt="Plan Premium" className="planImage" />
            <h4>Plan Premium</h4>
            <p>Acceso total a todos nuestros cursos avanzados y torneos exclusivos.</p>
            <button className="planButton">Hazte Premium</button>
          </div>
          <div className="planCard">
            <img src={planImage3} alt="Plan Estudiante" className="planImage" />
            <h4>Plan Estudiante</h4>
            <p>Descuentos especiales para estudiantes y acceso completo a todas las funcionalidades.</p>
            <button className="planButton">Descubre más</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 RGB Gamer Academy | Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
