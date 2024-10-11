import logo from './images/logo-name.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'; // Importar el ícono de flecha
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para validar el formato de correo
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUsername(email);

    if (email === '') {
      setError('');
    } else if (!validateEmail(email)) {
      setError('El formato del correo es incorrecto.');
    } else {
      setError('');
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });

      const { accessToken, refreshToken, expirationTime } = response.data;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('expirationTime', expirationTime);

      navigate('/');
    } catch (error) {
      console.error('Error en la autenticación:', error);
      alert('Error en la autenticación');
    }
  };

  // Función para manejar el clic en la flecha de retroceso
  const handleBackClick = () => {
    const userType = localStorage.getItem('userType');

    if (userType === 'child') {
      navigate('/childlandingpage');
    } else if (userType === 'teen') {
      navigate('/landingyoung');
    } else if (userType === 'adult') {
      navigate('/landingpage');
    } else {
      navigate('/landingpage');  // Ruta por defecto
    }
  };

  return (
    <div className="content">
      {/* Flecha de retroceso fuera del div .login-box */}
      <FaArrowLeft className="back-arrow" onClick={handleBackClick} />

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <img className="logo" src={logo} alt="logo" />
          <h1>Inicio de Sesión</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Escribe tu correo Electrónico"
              value={username}
              onChange={handleEmailChange}
              className={error ? 'error' : ''}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input type="submit" value="Iniciar Sesión" className="btn-submit" />
          <div className="remember-forgot">
            <label>¿No tienes una cuenta?</label>
            <Link to="/register">Regístrate gratis</Link>
            <a href="">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
