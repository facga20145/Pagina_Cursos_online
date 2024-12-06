import React, { useState, useEffect } from 'react';
import './PurchaseSteps.css';
import YapeQR from '../../images/yapeQR.jpg';

export default function PurchaseSteps() {
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); // Para manejar el estado de pago
  const [isChecked, setIsChecked] = useState(false); // Para manejar el estado del checkbox de confirmación
  const [memberEmails, setMemberEmails] = useState([]); // Para manejar los correos electrónicos de los miembros adicionales

  useEffect(() => {
    // Recuperamos los datos del usuario y el plan desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

    if (user && selectedPlan) {
      setUserData(user);
      setPlanData(selectedPlan);
    }
  }, []);

  // Calcular la edad y determinar la modalidad
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Función para manejar la selección del método de pago
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Función para calcular la fecha de pago siguiente
  const calculateNextPaymentDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1); // Sumar un año
    return today.toLocaleDateString("es-ES"); // Formato legible
  };

  // Función para formatear la fecha de nacimiento desde ISO (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Devuelve en formato YYYY-MM-DD
  };

  // Función para manejar el cambio en el checkbox de confirmación
  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  // Función para manejar los correos electrónicos de los miembros
  const handleMemberEmailChange = (e, index) => {
    const newEmails = [...memberEmails];
    newEmails[index] = e.target.value;
    setMemberEmails(newEmails);
  };

  // Validación de los correos electrónicos de los miembros
  const validateMemberEmails = () => {
    return memberEmails.every(email => email !== '');
  };

  // Si no hay datos del usuario o del plan, mostramos "Cargando..."
  if (!userData || !planData) {
    return <div>Cargando...</div>;
  }

  const age = calculateAge(userData.fechaNacimiento);
  const userMode = age <= 10 ? "KIDS" : age <= 18 ? "YOUNG" : "ADULTO"; // Definimos la modalidad según la edad
  const nextPaymentDate = calculateNextPaymentDate();

  const handleNextStep = () => {
    if (currentStep === 1 && isChecked) {
      // Si el plan es para 2 o 3 personas, vamos a miembros del plan
      if (planData.planName === "Plan premium para 2 personas" || planData.planName === "Plan premium para 3 personas") {
        setCurrentStep(2);
      } else {
        // Si el plan no es para 2 o 3 personas, vamos directamente a "Métodos de Pago"
        setCurrentStep(3);
      }
    } else if (currentStep === 2 && validateMemberEmails()) {
      // Solo si los emails de los miembros están llenos, pasamos al siguiente paso
      setCurrentStep(3);
    }
  };

  // Determinamos cuántos miembros adicionales se deben mostrar según el plan
  const membersInputs = [];
  if (planData.planName === "Plan premium para 2 personas" || planData.planName === "Plan premium para 3 personas") {
    const numMembers = planData.planName === "Plan premium para 2 personas" ? 2 : 3;
    for (let i = 0; i < numMembers; i++) {
      membersInputs.push(
        <div key={i}>
          <label>{`Correo miembro ${i + 1}:`}</label>
          <input
            type="email"
            value={memberEmails[i] || ''}
            onChange={(e) => handleMemberEmailChange(e, i)}
            className="input-field"
          />
          <br />
        </div>
      );
    }
  }

  return (
    <div>
      <h3 className='titlePay'>¡Paga y disfruta de tu curso!</h3>

      {/* Paso 1: Datos del Usuario */}
      {currentStep === 1 && (
        <div className="step-container">
          <h2>Datos del Usuario</h2>
          <label>
            Nombre:
            <input
              type="text"
              value={userData.nombre}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Apellido:
            <input
              type="text"
              value={userData.apellido}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Correo:
            <input
              type="email"
              value={userData.correo}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Fecha de Nacimiento:
            <input
              type="text"
              value={formatDate(userData.fechaNacimiento)}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Plan Adquirido:
            <input
              type="text"
              value={planData.planName}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Modalidad:
            <input
              type="text"
              value={userMode}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Monto:
            <input
              type="text"
              value={`S/${planData.price}`}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            Fecha de Pago Siguiente:
            <input
              type="text"
              value={nextPaymentDate}
              disabled
              className="input-field"
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckChange}
            />
            Confirmo que los datos son correctos
          </label>
          <br />
          <div className="botonPay">
            <button onClick={handleNextStep} disabled={!isChecked} className="next-button">
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: Miembros del Plan */}
      {currentStep === 2 && (
        <div className="step-container">
          <h2>Miembros del Plan</h2>
          {membersInputs.length > 0 && (
            <>
              <h3>Miembros del plan:</h3>
              {membersInputs}
              <div className="botonPay">
                <button onClick={() => {
                  if (validateMemberEmails()) {
                    setCurrentStep(3); // Solo avanzamos si los correos son válidos
                  }
                }} className="next-button" disabled={!validateMemberEmails()}>
                  Confirmar miembros
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Paso 3: Método de Pago */}
      {currentStep === 3 && (
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

          <div className="botonPay">
            <button onClick={() => alert('Pago completado!')} disabled={!paymentMethod} className="next-button">
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
