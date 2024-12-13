import './ServisYoung.css'
import jsIcon from "../../images/jsIcon.png"; // Ruta del icono de JavaScript
import phpIcon from "../../images/phpIcon.png"; // Ruta del icono de PHP
import swiftIcon from "../../images/swiftIcon.png"; // Ruta del icono de Swift
import javaIcon from "../../images/javaIcon.png"; // Ruta del icono de Java

import ProgramCard from './ProgramCard'
function ServisYoung() {
  return (
    <div className="ServisYoung">
       <div className="Servis-section">
      <div className="Servisleft-section">
        <h1>Utilizamos los mejores programas</h1>
      </div>
      <div className="Servisright-section">
        <ProgramCard
          icon={jsIcon}
          title="JavaScript"
          description="Además de HTML y CSS, es el mejor lenguaje de programación que se puede aprender para el desarrollo del front-end de la web."
        />
        <ProgramCard
          icon={phpIcon}
          title="PHP"
          description="Uno de los primeros lenguajes de back-end que muchos desarrolladores web consideran esencial aprender."
        />
        <ProgramCard
          icon={swiftIcon}
          title="Swift"
          description="Uno de los lenguajes de programación más recientes del mercado actual, el lenguaje principal de los productos de Apple."
        />
        <ProgramCard
          icon={javaIcon}
          title="Java"
          description="Java es un lenguaje de programación de alto nivel que permite a los programadores crear todo tipo de aplicaciones con facilidad."
        />
      </div>
    </div>
    </div>
  )
}

export default ServisYoung
