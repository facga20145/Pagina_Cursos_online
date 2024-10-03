import logo from './image/logo-name.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del form (recargar la página)

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });

      console.log('Respuesta del servidor:', response.data); // Log para ver la respuesta del servidor

      // Desestructuramos la respuesta del servidor para obtener accessToken, refreshToken y expirationTime
      const { accessToken, refreshToken, expirationTime } = response.data;

      // Almacenamos el token de acceso, refresh token y el tiempo de expiración en sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('expirationTime', expirationTime); // Guardamos el tiempo de expiración

      navigate('/dashboard'); // Navegar al dashboard
    } catch (error) {
      console.error('Error en la autenticación:', error);
      alert('Error en la autenticación');
    }
  };

  return (
    <div className="content">
      <div className="login-box">
        {/* Añadimos evento onSubmit en el formulario cuando usamos input*/}
        <form onSubmit={handleLogin}>
          <img className="logo" src={logo} alt="logo" />
          <h1>Inicio de Sesión</h1>
          <div className="input-box">
            <input type="text" placeholder="Escribe tu correo Electrónico" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-box">
            <input type="password" placeholder=" Escribe tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <input type="submit" value={"Iniciar Sesión"} className="btn-submit" />
          <div className="remember-forgot">
            <label>¿No tienes una cuenta?</label>
            <a href="">Registrate gratis</a>
            <a href="">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
