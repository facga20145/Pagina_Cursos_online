import "./FeatureYoung.css";
import FeatureCard from '../plans/FeatureCard'
import coursesIcon from '../images/CoursesIcon.png'
import ActivitiesIcon from '../images/ActivitiesIcon.png'
import LenguagesIcon from '../images/LenguagesIcon.png'
function FeatureYoung() {
  return (
    <div className="FeatureYoung">
      <div className="FeatureYoung-contend">
        <h1 className="highlight-text">
          ¡No postergues tu <span className="colored-text">educación</span>!
        </h1>
        <p>Ponte en acción y crea cosas increíbles con tecnología</p>
      </div>
      <div className="features-container">
      <FeatureCard
        icon={coursesIcon}
        title="Cursos"
        description="Aprende a crear cosas increíbles y deja volar tu imaginación."
      />
      <FeatureCard
        icon={ActivitiesIcon}
        title="Actividades"
        description="Empieza a programar hoy y descubre todo lo que puedes crear."
      />
      <FeatureCard
        icon={LenguagesIcon}
        title="Lenguajes"
        description="Cada nuevo código es una herramienta para crear cosas increíbles."
      />
    </div>
    </div>
  );
}

export default FeatureYoung;
