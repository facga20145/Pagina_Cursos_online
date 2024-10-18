import "./CursosKids.css";

function CursosKids({ title, releaseDate, description, imageSrc}) {
  return (
    <div className="AboutUsKids">
      <div className="AboutUsKids-Contend">
        <div className="subContend">
        </div>
        <div className="AboutUsKids-Title">
          <h1>{title}</h1>
          <p className="release-date">{releaseDate}</p>
          <p className="main-description">{description}</p>
        </div>
        <div className="AboutUsKids-Image">
          <img src={imageSrc} alt="Curso de programación" />
        </div>
      </div>
    </div>
  );
}

export default CursosKids;
