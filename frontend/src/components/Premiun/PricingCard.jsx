import '../Premiun/PricingCard.css'
function PricingCard({ planName, price, discountText, buttonText, isBestOffer }) {
    return (
      <div className={`pricing-card ${isBestOffer ? 'best-offer' : ''}`}>
        {isBestOffer && <div className="best-offer-badge">Mejor Oferta</div>}
        <h3>S/{price}</h3>
        <h4>{planName}</h4>
        {discountText && <p className="discount">{discountText}</p>}
        <button>{buttonText}</button>
      </div>
    );
  }
export default PricingCard
