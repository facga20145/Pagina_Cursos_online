import React, { useState } from 'react';
import './PurchaseSteps.css';
import YapeQR from '../../images/yapeQR.jpg'

export default function PurchaseSteps() {
  // Estado para llevar el seguimiento del paso actual
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); // Para manejar el estado de pago

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  // Función para manejar los cambios en los datos del usuario
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Función para manejar la selección del método de pago
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Función para simular el pago
  const completePayment = () => {
    setIsPaymentCompleted(true);
    alert('Pago completado!'); // Aquí puedes cambiarlo por una lógica real de pago
    nextStep(); // Avanza al siguiente paso
  };

  // Renderización de cada paso
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <h2>Datos del Usuario</h2>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleUserDataChange}
                required
                className="input-field"
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserDataChange}
                required
                className="input-field"
              />
            </label>
            <br />
            <div className='botonPay'>
              <button onClick={nextStep} disabled={!userData.name || !userData.email} className="next-button">
                Siguiente
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-container">
            <h2>Método de Pago</h2>
            <label>
              <input
                type="radio"
                value="PagoEfectivo"
                checked={paymentMethod === 'PagoEfectivo'}
                onChange={handlePaymentChange}
                className="payment-option"
              />
              Pago Efectivo
            </label>
            <br /><br />
            <label>
              <input
                type="radio"
                value="Tarjeta"
                checked={paymentMethod === 'Tarjeta'}
                onChange={handlePaymentChange}
                className="payment-option"
              />
              Tarjeta
            </label>
            <br /><br />
            <label>
              <input
                type="radio"
                value="BilleteraDigital"
                checked={paymentMethod === 'BilleteraDigital'}
                onChange={handlePaymentChange}
                className="payment-option"
              />
              Billetera Digital
            </label>
            <br /><br />

            {paymentMethod === 'Tarjeta' && (
              <div className="card-info">
                <h3>Ingresa tus datos de tarjeta:</h3>
                <label>
                  Número de tarjeta:
                  <input type="text" className="input-field" required />
                </label>
                <br />
                <label>
                  Fecha de vencimiento:
                  <input type="text" className="input-field" required />
                </label>
                <br />
                <label>
                  Código de seguridad:
                  <input type="text" className="input-field" required />
                </label>
              </div>
            )}

            {paymentMethod === 'BilleteraDigital' && (
              <div className="card-info">
                <h3>Escanea el QR para pagar:</h3>
                <img src={YapeQR} alt="QR de Yape" className="qr-image" />
                <br />
              </div>
            )}

            <button onClick={nextStep} disabled={!paymentMethod} className="next-button">
              Siguiente
            </button>
          </div>
        );

      case 3:
        return (
          <div className="step-container">
            <h2>Confirmación de Compra</h2>
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Método de Pago:</strong> {paymentMethod}</p>
            <button onClick={() => alert('Compra confirmada!')} className="confirm-button">
              Confirmar Compra
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className='titlePay'>¡Paga y disfruta de tu curso!</h3>
      <div className="purchase-steps-container">
        {renderStep()}
      </div>
    </div>
  );
}
