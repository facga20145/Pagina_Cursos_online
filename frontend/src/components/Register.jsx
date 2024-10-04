import Logo from "./images/logo-name.png";
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  // Estados para manejar los valores de los inputs
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value); // Actualiza el estado con el valor seleccionado
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Realiza la solicitud POST al backend
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        nombre,
        apellido,
        edad,
        genero: gender,
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);

      // Navega al login después del registro exitoso
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <div className="conten">
      <div className="content-Register">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1>Crea tu cuenta</h1>
        <form className="Formulario" onSubmit={handleRegister}>
          <div className="boxs">
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
            <select name="genero" value={gender} onChange={handleGenderChange} required>
              <option value="" disabled>
                Selecciona tu género
              </option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <input type="submit" value={"Registrate ahora"} />
          </div>
          <div className="alredy">
            <label>¿Ya tienes una cuenta?</label>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
