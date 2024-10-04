import Logo from "./images/logo-name.png";
import { Link } from 'react-router-dom';
import "./Register.css";
import React, { useState } from 'react';

function Register() {
  // Estado para manejar el valor seleccionado
  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value); // Actualiza el estado con el valor seleccionado
  };
  return (
    <div className="conten">
      <div className="content-Register">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1>Crea tu cuenta</h1>
        <form className="Formulario">
            <div className="boxs">
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
          <input type="text" placeholder="Edad" />
          <select name="genero" value={gender} onChange={handleGenderChange}>
            <option value="" disabled>
              Selecciona tu género
            </option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
          <input type="Email" placeholder="Correo electrónico" />
          <input type="Password" placeholder="Contraseña" />
          <input type="Password" placeholder="Confirmar contraseña" />
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
