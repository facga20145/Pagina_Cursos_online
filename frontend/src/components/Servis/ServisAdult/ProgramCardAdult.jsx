import './ProgramCardAdult.css';

function ProgramCardAdult({ icon, title, description }) {
  return (
    <div className="program-cardAdult">
      <img src={icon} alt={title} className="program-iconAdult" />
      <div className="program-infoAdult">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProgramCardAdult;