import "./Premium.css";
import PricingCard from '../Premiun/PricingCard';
import Header from "../../components/header/Header";
function Premium() {
  return (
    <div className="body-Planes">
      <Header />
      <div className="Banner"> 
        <h1>Ofrecemos planes exclusivos</h1>
        <h2>¡Descubre los mejores cursos en nuestra academia!</h2>
        <div className="Banner-p">
        <p>
          Explora nuestros planes de estudio y adquiere conocimientos en las
          tecnologías más demandadas del mercado. ¡Es tu momento de crecer
          profesionalmente con nuestra academia!
        </p>
        </div>
      </div>
      <div className="premium-container">
      <PricingCard
        planName="Plan premium personal"
        price={200}
        discountText="¡Pago unico cada año!"
        buttonText="¡Sube a este plan!"
      />
      <PricingCard
        planName="Plan premium para 2 personas"
        price={350}
        discountText="¡Ahorra S/50 por año!"
        buttonText="¡Sube a este plan!"
      />
      <PricingCard
        planName="Plan premium para 3 personas"
        price={500}
        discountText="¡Ahorra S/100 por año!"
        buttonText="¡Sube a este plan!"
        isBestOffer={true}
      />
    </div>
    </div>
  );
}

export default Premium;