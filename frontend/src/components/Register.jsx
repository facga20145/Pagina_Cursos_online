import Logo from "./image/logo-name.png";
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
  return (
    <div className="conten">
      <div className="content-Register">
        <img className="Logo" src={Logo} alt="Logo" />
        <h1>Crea tu cuenta</h1>
        <form action="">
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Apellido" />
          <input type="text" placeholder="Edad" />
          <select name="genero">
            <option value="" disabled selected>
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
          <Link to="/login">Inicia sesión</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
