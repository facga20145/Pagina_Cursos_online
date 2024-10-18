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
  const [emailError, setEmailError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genero, setGenero] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNombre = (nombre) => {
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
    return nombreRegex.test(nombre);
  };

  const validateApellido = (apellido) => {
    const apellidoRegex = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
    return apellidoRegex.test(apellido);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Mínimo 8 caracteres, una mayúscula, una minúscula y un número
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailValue === "") {
      setEmailError("");
    } else if (!validateEmail(emailValue)) {
      setEmailError("El formato del correo es incorrecto.");
    } else {
      setEmailError("");
    }
  };

  const handleNombreChange = (e) => {
    const nombreValue = e.target.value;
    setNombre(nombreValue);
    if (nombreValue === "") {
      setNombreError(""); // Si está vacío, no mostrar error
    } else if (!validateNombre(nombreValue)) {
      setNombreError("El nombre debe tener entre 2 y 30 letras.");
    } else {
      setNombreError("");
    }
  };

  const handleApellidoChange = (e) => {
    const apellidoValue = e.target.value;
    setApellido(apellidoValue);
    if (apellidoValue === "") {
      setApellidoError(""); // Si está vacío, no mostrar error
    } else if (!validateApellido(apellidoValue)) {
      setApellidoError("El apellido debe tener entre 2 y 30 letras.");
    } else {
      setApellidoError("");
    }
  };
  const handleFechaChange = (e) => {
    setFecha(e.target.value); // Eliminar la conversión adicional
  };
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue === "") {
      setPasswordError("");
    } else if (!validatePassword(passwordValue)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
    } else {
      setPasswordError("");
    }
  };

  // Modificamos la función handleBackClick
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

  const handleGeneroChange = (event) => {
    setGenero(event.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          nombre,
          apellido,
         /*  fecha_nacimiento: */fechaNacimiento ,
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
              onChange={handleNombreChange}
              required
            />
            {nombreError && <p className="error-message">{nombreError}</p>}

            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={handleApellidoChange}
              required
            />
            {apellidoError && <p className="error-message">{apellidoError}</p>}

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
              onChange={handleGeneroChange}
              required
            >
              <option value="" disabled>
                Selecciona tu género
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>

            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
              className={emailError ? "error" : ""}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <div className="password-box-Register">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <span
                className="toggle-password-Register"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
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
