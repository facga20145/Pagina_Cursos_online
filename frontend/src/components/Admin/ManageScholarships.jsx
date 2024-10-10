import { useState } from 'react';
import './ManageScholarships.css';

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([
    { id: 1, name: 'Postulante 1', email: 'applicant1@example.com', status: 'Pendiente' }
  ]);

  const handleScholarshipStatus = (id, status) => {
    setScholarships(scholarships.map(s => 
      s.id === id ? { ...s, status } : s
    ));
  };

  return (
    <div className="manage-scholarships">
      <h1>Gestión de Becas</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map(scholarship => (
            <tr key={scholarship.id}>
              <td>{scholarship.name}</td>
              <td>{scholarship.email}</td>
              <td>{scholarship.status}</td>
              <td>
                <button onClick={() => handleScholarshipStatus(scholarship.id, 'Aprobado')}>Aprobar</button>
                <button onClick={() => handleScholarshipStatus(scholarship.id, 'Rechazado')}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
