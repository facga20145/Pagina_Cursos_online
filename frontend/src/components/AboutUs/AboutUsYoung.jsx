import "./AboutUsYoung.css";
import image from "../images/Icon-about.png";
function AboutUsYoung() {
  return (
    <div className="AboutUsYoung">
      <div className="AboutUsYoung-Contend">
        <div className="subContend">
          <h3>Próximo Curso</h3>
        </div>
        <div className="AboutUs-Title">
          <h1>Skill Connect 2024: Programacion para jovenes</h1>
          <p className="release-date"> Disponible desde el viernes 20 de diciembre</p>
          <p className="main-description">
            Conviértete en el creador de tu propio futuro! Aprende a programar y
            descubre cómo la tecnología puede ayudarte a transformar tus ideas
            en proyectos innovadores y emocionantes.
          </p>
        </div>

        <div className="AboutUs-Image">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AboutUsYoung;
