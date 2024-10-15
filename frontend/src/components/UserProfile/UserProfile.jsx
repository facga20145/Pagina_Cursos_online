import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del usuario de localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.nombre);
        setUserEmail(user.email);
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
        <img src="/ruta/a/imagen/perfil.jpg" alt="Profile" className="profile-picture" />
        <div className="Datos">
          <span className="user-name">{userName}</span>
          <span className="user-email">{userEmail}</span>
        </div>
        <span className="dropdown-icon">▼</span>
      </div>

      {showDropdown && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/profile")}>Ver perfil</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
