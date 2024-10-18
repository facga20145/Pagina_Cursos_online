
import Certificate from "./Certificate";

const CertificatePage = () => {
  const studentName = "Alyson Urbina";
  const courseName = "Desarrollo Full Stack";
  const courseHours = 40;
  const completionDate = "18 de octubre de 2024";
  const instructorName = "Juan Pérez";

  return (
    <div>
      <Certificate 
        studentName={studentName}
        courseName={courseName}
        courseHours={courseHours}
        completionDate={completionDate}
        instructorName={instructorName}
      />
    </div>
  );
};

export default CertificatePage;
