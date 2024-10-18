import Logo from "./images/Logo-black.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFecha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [genero, setGenero] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Validación de contraseña: al menos 8 caracteres, con mayúsculas, minúsculas, números y caracteres especiales
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (!validatePassword(pwd)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Esto te lleva de vuelta a la página anterior
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value); // Usar el valor directamente del input de fecha
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar que la fecha se esté enviando correctamente
    console.log("Fecha de nacimiento:", fechaNacimiento);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Verificar si la contraseña cumple con los requisitos de seguridad
    if (passwordError) {
      alert(passwordError);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          nombre,
          apellido,
          fecha_nacimiento: fechaNacimiento,  // Se pasa la fecha correctamente
          genero,
          email,
          password,
        }
      );

      console.log("Respuesta del servidor:", response.data);

      // Limpiar el localStorage después del registro
      localStorage.removeItem("userType");

      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro.");
    }
  };

  return (
    <div className="contenRegister">
      <FaArrowLeft className="back-arrow-Register" onClick={handleBackClick} />

      <div className="content-Register">
        <img className="LogoRegister" src={Logo} alt="Logo" />
        <h1>Crea tu cuenta</h1>
        <form className="FormularioRegister" onSubmit={handleRegister}>
          <div className="boxsRegister">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />

            <div className="boxsRegister">
              <div className="input-wrapperRegister">
                <input
                  type="date"
                  placeholder="Fecha de nacimiento"
                  value={fechaNacimiento}
                  onChange={handleFechaChange}
                  required
                />
              </div>
            </div>

            <select
              name="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona tu género
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-box-Register">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span
                className="toggle-password-Register"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>

            <div className="password-box-Register">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password-Register"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input type="submit" value={"Registrate ahora"} />
          </div>
          <div className="alredyRegister">
            <label>¿Ya tienes una cuenta?</label>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;