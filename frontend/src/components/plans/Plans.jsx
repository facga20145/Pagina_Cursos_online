import "./Plans.css";
import Books from '../images/Books-Icon.png'
import Activity from '../images/Activity-Icon.png'
import Languages from '../images/Language-Icon.png'
export default function Plans() {
  const Plan = ({ img, text, para }) => {
    return (
      <div className="containerBox">
        <img src={img} alt="Plan image" />
        <h3>{text}</h3>
        <div className="paraContainer">
          <p>{para}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="plansContainer">
      <h3 className="head">No aplaces tu
        <span className="highlight"> educación</span>
        </h3>
      <p>Actívate y crea cosas asombrosas usando la programación</p>

      <div className="plansBox">
        <Plan
          img={Books}
          text="Curso"
          para="Descubre cómo crear cosas asombrosas y deja que tu imaginación se eleve"

        />

        <Plan
          img={Activity}
          text="Actividades"
          para="Comienza a programar hoy y explora todo lo que eres capaz de crear"
        />

        <Plan
          img={Languages}
          text="Lenguaje"
          para="Cada código que escribes es una nueva herramienta para crear cosas asombrosas"

        />
      </div>
    </div>
  );
}
