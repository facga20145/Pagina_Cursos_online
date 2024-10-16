import React from 'react';
import PricingCard from './Premiun/PricingCard';
import Header from './header/headerKids/HeaderKids'; // Asumiendo que tienes un Header específico para niños
import './KidPlan.css'; // Archivo de estilos para KidPlan

function KidPlan() {
  return (
    <div className="body-KidPlan">
      <Header /> {/* Componente Header específico para niños */}
      
      <div className="Banner"> 
        <h1>¡Planes divertidos para niños!</h1>
        <h2>¡Aprende y diviértete con nuestros cursos diseñados especialmente para ti!</h2>
        <div className="Banner-p">
          <p>
            Explora nuestros planes diseñados para que los niños aprendan sobre tecnología
            de manera divertida y entretenida. ¡Es hora de empezar tu aventura!
          </p>
        </div>
      </div>

      <div className="premium-container">
        {/* Plan 1 - Personal */}
        <PricingCard
          planName="Plan Estrella"
          price={200}
          discountText="¡Pago único anual!"
          additionalText="*Incluye acceso para 1 cuenta*"
          buttonText="¡Sube a este plan!"
          icon="🌟" // Icono divertido para el plan
        />

        {/* Plan 2 - Para 2 personas */}
        <PricingCard
          planName="Plan Súper Dúo"
          price={350}
          discountText="¡Ahorra S/50 cada año!"
          additionalText="*Incluye acceso para 2 cuentas*"
          buttonText="¡Sube a este plan!"
          icon="💫"
        />

        {/* Plan 3 - Mejor Oferta */}
        <PricingCard
          planName="Plan Familiar"
          price={500}
          discountText="¡Ahorra S/100 cada año!"
          additionalText="*Incluye acceso para 4 cuentas*"
          buttonText="¡Sube a este plan!"
          isBestOffer={true} // Destaca este plan como la mejor oferta
          icon="🎉"
        />
      </div>
    </div>
  );
}

export default KidPlan;
