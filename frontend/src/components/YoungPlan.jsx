import React from 'react';
import PricingCard from './Premiun/PricingCard';
import Header from './header/headerYouth/HeaderYoung'; 
import './YoungPlan.css'; 

function TeenPlan() {
  return (
    <div className="body-TeenPlan">
      <Header /> {/* Componente Header específico para adolescentes */}
      
      <div className="Banner">

    {/* Texto principal del banner */}
    <h1>¡Domina la programación y construye el futuro con tus propias manos!</h1>
    
    {/* Subtítulo */}
    <h2>Inicia tu viaje en la programación y crea soluciones digitales</h2>
    
    {/* Descripción del banner */}
    <div className="Banner-p">
      <p>
        Aprende con nuestros cursos diseñados para adolescentes y prepárate para el mundo digital. ¡Es tu momento de brillar!
      </p>
    </div>
    <a href="#planes" className="cta-button">Comienza Ahora</a>
</div>


      {/* Contenedor de planes de precios */}
      <div id="planes" className="premium-container">
        {/* Plan 1 - Personal */}
        <PricingCard
          planName="Plan Individual"
          price={150}
          discountText="¡Comienza con todo!"
          additionalText="*Acceso para 1 persona*"
          buttonText="¡Sube a este plan!"
          icon="🚀"
        />

        {/* Plan 2 - Avanzado */}
        <PricingCard
          planName="Plan Duo"
          price={300}
          discountText="¡Mejora tus habilidades!"
          additionalText="*Acceso para 2 personas*"
          buttonText="¡Sube a este plan!"
          icon="💻"
        />

        {/* Plan 3 - Experto */}
        <PricingCard
          planName="Plan Familiar"
          price={500}
          discountText="¡Conviértete en un profesional!"
          additionalText="*Acceso para 4 personas"
          buttonText="¡Sube a este plan!"
          isBestOffer={true} // Destaca este plan como la mejor oferta
          icon="🎓"
        />
      </div>
    </div>
  );
}

export default TeenPlan;
