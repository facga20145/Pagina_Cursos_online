import '../AboutUsAdult/AboutUsAdult.css'
import AboutUsIcon from '../../images/AboutUsAdult-Icon.svg'
function AboutUsAdult() {
  return (
    <div className="AboutUsAdult">
    <div className="AboutUsAdult-Contend">
      <div className="subContendAdult">
        <h3>Próximo Curso</h3>
      </div>
      <div className="AboutUsAdult-Title">
        <h1>Skill Connect 2024: Programacion para jovenes</h1>
        <p className="release-dateAdult"> Disponible desde el viernes 20 de diciembre</p>
        <p className="main-descriptionAdult">
          Conviértete en el creador de tu propio futuro! Aprende a programar y
          descubre cómo la tecnología puede ayudarte a transformar tus ideas
          en proyectos innovadores y emocionantes.
        </p>
      </div>
      <div className="AboutUsAdult-Image">
        <img src={AboutUsIcon} alt="" />
      </div>
    </div>
  </div>
  )
}

export default AboutUsAdult
