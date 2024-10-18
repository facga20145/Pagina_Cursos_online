
import "./Certificate.css"; // Archivo CSS que usaremos para estilizar

const Certificate = ({ studentName, courseName, courseHours, completionDate, instructorName }) => {
  return (
    <div className="certificate-container">
      <div className="certificate-content">
        <h1 className="certificate-title">CERTIFICADO DE FINALIZACIÓN</h1>
        <p className="certificate-text">La <strong>Academia SkillConnect</strong> certifica que:</p>
        <h2 className="student-name">{studentName}</h2>
        <p className="certificate-text">ha completado satisfactoriamente el curso</p>
        <h2 className="course-name">{courseName}</h2>
        <p className="certificate-text">con una duración total de <strong>{courseHours} horas</strong> académicas.</p>
        <p className="certificate-text">Fecha de finalización: <strong>{completionDate}</strong></p>
        <p className="certificate-text">Instructor: <strong>{instructorName}</strong></p>
        <div className="signature-section">
          <p>____________________________</p>
          <p>Firma del Instructor</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
