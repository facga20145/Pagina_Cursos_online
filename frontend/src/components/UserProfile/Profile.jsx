import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  console.log(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Obtener los datos del usuario de localStorage o hacer una llamada a una API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      console.log(userData);
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
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Apellido:{user.apellido}</p>
      <p>Fecha de Nacimiento: {formatDate(user.fechaNacimiento)}</p> {/* Formatea la fecha */}
      <p>Genero:{user.genero}</p> {/* Mostrar el género */}
      <p>Correo Electrónico: {user.email}</p>
    </div>
  );
}
export default Profile;
