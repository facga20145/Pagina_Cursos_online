import ProgramCardAdult from './ProgramCardAdult'
import ServisAdultIcon from '../../images/ServisAdult-Icon.png'
import DwIcon from '../../images/DW-Icon.png'
import VisualIcon from '../../images/Visual-Icon.png'
import AtomIcon from '../../images/Atom-Icon.png'
import './ServisAdult.css'
function ServisAdult() {
  return (
    <div className="ServisAdult">
      <div className="Servis-section-adult">
        <div className="Servisleft-section-adult">
          <h1>Hacemos uso de los mejores programas</h1>
          <img
            src={ServisAdultIcon}
            alt="ServisAdultIcon"
            className="ServisAdultIcon"
          />
        </div>
        <div className="Servisright-section-adult">
          <ProgramCardAdult
            icon={DwIcon}
            title="ADOBE DREAMWEAVER"
            description="Una herramienta de programación en forma de suite que tiene como finalidad construir, diseñar y editar sitios web, así como plataformas de vídeo y aplicaciones de distinto tipo."
          />
          <ProgramCardAdult
            icon={VisualIcon}
            title="VISUAL STUDIO CODE"
            description="Permite escribir y editar código eficientemente, con autocompletado, depuración y soporte para múltiples lenguajes a través de extensiones"
          />
          <ProgramCardAdult
            icon={AtomIcon}
            title="ATOM"
            description="Altamente personalizable y diseñado para la colaboración, permitiendo a los usuarios trabajar en proyectos en tiempo real."
          />
        </div>
      </div>
    </div>
  );
}

export default ServisAdult;
