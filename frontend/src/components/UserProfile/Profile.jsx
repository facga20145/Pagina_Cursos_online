import { useEffect, useState } from "react";
import Photo from '../images/Photo-perfil.svg'
import './Profile.css'

function Profile() {
  const [user, setUser] = useState(null);
  console.log(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Obtener los datos del usuario de localStorage o hacer una llamada a una API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);
    // Función para formatear la fecha de nacimiento
    const formatDate = (dateString) => {
        if (!dateString) return "Fecha inválida";
        const date = new Date(dateString);
        return isNaN(date) ? "Fecha inválida" : date.toLocaleDateString(); // Convertir a formato legible
      };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Profile-contend">
      <div className="Profile-Photo">
        <img src={Photo} alt="" />
      </div>
      <div className="Profile-info">
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Apellido:{user.apellido}</p>
      <p>Fecha de Nacimiento: {formatDate(user.fechaNacimiento)}</p> {/* Formatea la fecha */}
      <p>Genero:{user.genero}</p> {/* Mostrar el género */}
      <p>Correo Electrónico: {user.email}</p>
      </div>
    </div>
  );
}
export default Profile;
