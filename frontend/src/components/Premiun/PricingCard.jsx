import '../Premiun/PricingCard.css';

function PricingCard({ planName, price, discountText, buttonText, isBestOffer, icon, additionalText }) {
  const handleButtonClick = () => {
    // Guardar el plan seleccionado en el localStorage
    const selectedPlan = {
      planName,
      price,
      discountText,
    };
    
    // Guardamos el plan en el localStorage
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));

    // Redirigir a la página de pago (puedes cambiar la URL si es necesario)
    window.location.href = "/Pago"; // Aquí debes colocar la ruta de la interfaz de pago
  };

  return (
    <div className={`pricing-card ${isBestOffer ? 'best-offer' : ''}`}>
      {/* Badge de mejor oferta */}
      {isBestOffer && <div className="best-offer-badge">Mejor Oferta</div>}
      
      {/* Icono junto al precio */}
      <h3>{icon} S/{price}</h3>
      
      {/* Nombre del plan */}
      <h4>{planName}</h4>

      {/* Descuento si existe */}
      {discountText && <p className="discount">{discountText}</p>}
      
      {/* Texto adicional si existe */}
      {additionalText && <p className="additionalText">{additionalText}</p>}
      
      {/* Botón de acción */}
      <button onClick={handleButtonClick}>{buttonText}</button>
    </div>
  );
}

export default PricingCard;
