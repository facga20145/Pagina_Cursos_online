import logo from "../images/Logo-black.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; // Importar el ícono de flecha
import "./Login.css";

function Login() {
  // Definir el estado para verificar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para validar el formato de correo
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUsername(email);

    if (email === "") {
      setError("");
    } else if (!validateEmail(email)) {
      setError("El formato del correo es incorrecto.");
    } else {
      setError("");
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          username,
          password,
        }
      );
    
      // Verificar si la respuesta tiene el token y el usuario
      if (response.data && response.data.accessToken && response.data.user) {
        // Guardar el token de acceso y los datos del usuario en localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Establecer el estado de login
        setIsLoggedIn(true);

        // Guarda los tokens y el tiempo de expiración en sessionStorage
        const { accessToken, refreshToken, expirationTime } = response.data;

        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("expirationTime", expirationTime);

        // Leer el tipo de landing almacenado
        const landingPage = localStorage.getItem("landingPage");

        // Redirigir según el tipo de landing
        if (landingPage === "child") {
          navigate("/childlandingpage");
        } else if (landingPage === "young") {
          navigate("/landingyoung");
        } else if (landingPage === "adult") {
          navigate("/landingpage");
        } else {
          navigate("/landingpage"); // Página por defecto si no se encuentra el valor
        }
      } else {
        setError("Datos de autenticación inválidos.");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Error en la autenticación");
    }
  };

  // Función para manejar el clic en la flecha de retroceso
  const handleBackClick = () => {
    const userType = localStorage.getItem("userType");

    if (userType === "child") {
      navigate("/childlandingpage");
    } else if (userType === "teen") {
      navigate("/landingyoung");
    } else if (userType === "adult") {
      navigate("/landingpage");
    } else {
      navigate("/landingpage"); // Ruta por defecto
    }
  };

  return (
    <div className="contentLogin">
      {/* Flecha de retroceso fuera del div .login-box */}
      <FaArrowLeft className="back-arrow-Login" onClick={handleBackClick} />

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <img className="logo-Login" src={logo} alt="logo" />
          <h1>Inicio de Sesión</h1>
          <div className="input-box-Login">
            <input
              type="text"
              placeholder="Escribe tu correo Electrónico"
              value={username}
              onChange={handleEmailChange}
              className={error ? "error" : ""}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="input-box-Login">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password-Login"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn-submit-Login"
          />
          <div className="remember-forgot-Login">
            <label>¿No tienes una cuenta?</label>
            <Link to="/register">Regístrate gratis</Link>
            <Link to="/register">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
