import './ProgramCard.css';

function ProgramCard({ icon, title, description }) {
  return (
    <div className="program-card">
      <img src={icon} alt={title} className="program-icon" />
      <div className="program-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProgramCard;