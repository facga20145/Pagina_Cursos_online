import '../Premiun/PricingCard.css';

function PricingCard({ planName, price, discountText, buttonText, isBestOffer, icon, additionalText }) {
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
      <button>{buttonText}</button>
    </div>
  );
}

export default PricingCard;
