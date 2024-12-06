import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhotoPerfil from '../images/Photo-profile2.svg';
import "./UserProfile.css";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        console.log("Datos obtenidos de localStorage en UserProfile:", user);
        setUserName(user.nombre || "Usuario desconocido"); // Manejo seguro
        setUserEmail(user.correo || "Correo no disponible");
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage", error);
      }
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="user-profile">
      <div className="profile-info" onClick={toggleDropdown}>
        <div className="profile-picture">
          <img src={PhotoPerfil} alt="Profile" />
        </div>
        <span className="dropdown-icon">▼</span>
      </div>

      {showDropdown && (
        <div className="dropdown-menu">
          {/* Mostrar los datos solo dentro del menú cuando está abierto en pantallas pequeñas */}
          <div className="Datos">
            <span className="user-name">{userName}</span>
            <span className="user-email">{userEmail}</span>
          </div>
          <button onClick={() => navigate("/profile")}>Ver perfil</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
