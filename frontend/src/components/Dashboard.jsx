import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [remainingTime, setRemainingTime] = useState(null); // Estado para el tiempo restante
  let interval; // Guardar el intervalo para controlarlo globalmente

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    let expirationTime = sessionStorage.getItem('expirationTime'); // Obtener el tiempo de expiración

    if (accessToken && expirationTime) {
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      let timeLeft = expirationTime - currentTime; // Tiempo restante en segundos
      setRemainingTime(timeLeft); // Guardar el tiempo restante

      // Función para refrescar el token antes de que expire
      const refreshAccessToken = async () => {
        try {
          console.log('Intentando refrescar el access token...');
          const response = await axios.post('http://localhost:4000/api/auth/refresh-token', { refreshToken });
          const { accessToken: newAccessToken, expirationTime: newExpirationTime } = response.data;

          // Almacenar el nuevo token de acceso y el nuevo tiempo de expiración
          sessionStorage.setItem('accessToken', newAccessToken);
          sessionStorage.setItem('expirationTime', newExpirationTime);

          expirationTime = newExpirationTime; // Actualizar el tiempo de expiración globalmente
          timeLeft = expirationTime - Math.floor(Date.now() / 1000); // Actualizar el tiempo restante
          setRemainingTime(timeLeft);

          clearInterval(interval); // Detener el intervalo anterior
          startCountdown(); // Reiniciar la cuenta regresiva
          console.log('Nuevo access token obtenido y tiempo actualizado');
        } catch (error) {
          console.error('Error al refrescar el token:', error);
          sessionStorage.clear(); // Limpiar el sessionStorage en caso de error
          window.location.href = '/login'; // Redirigir al login si falla el refresh token
        }
      };

      // Función para manejar el intervalo y reiniciarlo al refrescar el token
      const startCountdown = () => {
        interval = setInterval(() => {
          const currentTime = Math.floor(Date.now() / 1000);
          timeLeft = expirationTime - currentTime; // Actualizar tiempo restante
          setRemainingTime(timeLeft);

          // Si faltan menos de 5 segundos para que expire, refrescar el token
          if (timeLeft <= 5 && refreshToken) {
            clearInterval(interval); // Limpiar el intervalo antes de refrescar
            refreshAccessToken(); // Refrescar el access token
          }

          // Si el token ya expiró, cerrar sesión
          if (timeLeft <= 0) {
            clearInterval(interval); // Detener el intervalo si el token expira
            sessionStorage.clear(); // Limpiar el sessionStorage
            window.location.href = '/login'; // Redirigir al login si el token expira
          }
        }, 1000);
      };

      startCountdown(); // Iniciar la cuenta regresiva
    }
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Bienvenido, {username}</h2>
      {remainingTime !== null ? (
        <p>Tiempo restante del token: {remainingTime} segundos</p>
      ) : (
        <p>Cargando tiempo restante...</p>
      )}
    </div>
  );
}

export default Dashboard;
