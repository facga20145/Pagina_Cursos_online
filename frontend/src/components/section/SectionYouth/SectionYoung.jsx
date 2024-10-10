import'./SectionYoung.css'
import imagen from '../../images/LogoB-Young.png'
function SectionYoung() {
  return (
    <div className='SectionYoung-Contend'>
      <div className="text-sectionyoung">
        <h1>Proyecto Tecnologico</h1>
        <p>Explora la programación y transforma tus ideas en proyectos innovadores con una plataforma que impulsa tu creatividad y habilidades tecnológicas.</p>
        <button className="join-button">¡ÚNETE AHORA!</button>
      </div>
      <div className="image-sectionYoung">
        <img src={imagen} alt="Imagen del proyecto" />
      </div>
    </div>
  )
}

export default SectionYoung
