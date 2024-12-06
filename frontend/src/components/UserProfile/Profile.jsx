import { useEffect, useState } from "react";
import Header from "../header/HeaderAdult/Header";
import Photo from "../images/Photo-profile2.svg";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  console.log(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Obtener los datos del usuario de localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("Datos obtenidos de localStorage:", userData);
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Función para formatear la fecha de nacimiento
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha inválida";
    
    // Crear un objeto Date usando la fecha de la base de datos
    const date = new Date(dateString);
    
    // Si la fecha no es válida, devolver "Fecha inválida"
    if (isNaN(date)) return "Fecha inválida";
  
    // Formatear la fecha a formato día/mes/año (dd/mm/yyyy)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
  
    // Devolver la fecha en formato legible
    return `${day}/${month}/${year}`;
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  console.log("Fecha de nacimiento recibida:", user.fechaNacimiento); // Verifica la fecha recibida

  return (
    <div className="background-contend">
      <Header isWhite={true}/>

      <div className="profile-contend">
        <div className="data-contend">
          <div className="Profile-Photo">
            <img src={Photo} alt="" />
          </div>
          <div className="Profile-info">
            <h1>Perfil de Usuario</h1>
            <p>Nombre: <span className="dato">{user.nombre}</span></p>
            <p>Apellido:<span className="dato">{user.apellido}</span></p>
            <p>Fecha de Nacimiento: <span className="dato">{formatDate(user.fechaNacimiento)}</span></p>
            <p>Genero: <span className="dato">{user.genero}</span></p>
            <p>Correo Electrónico: <span className="dato">{user.correo}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
