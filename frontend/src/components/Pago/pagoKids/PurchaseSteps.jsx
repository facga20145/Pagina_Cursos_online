import React, { useState, useEffect } from 'react';
import './PurchaseSteps.css';
import YapeQR from '../../images/yapeQR.jpg';
import axios from 'axios'; // Asegúrate de tener Axios para hacer las peticiones

export default function PurchaseSteps() {
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); 
  const [isChecked, setIsChecked] = useState(false); 
  const [memberEmails, setMemberEmails] = useState([]); 
  const [isEmailValid, setIsEmailValid] = useState(true); // Para manejar la validación de correos
  const [emailValidationComplete, setEmailValidationComplete] = useState(false); // Nuevo estado

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

    if (user && selectedPlan) {
      setUserData(user);
      setPlanData(selectedPlan);
    }
  }, []);

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar correos
    return emailRegex.test(email);
  };
  
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateNextPaymentDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() + 1);
    return today.toLocaleDateString("es-ES");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMemberEmailChange = (e, index) => {
    const newEmails = [...memberEmails];
    newEmails[index] = e.target.value;
    setMemberEmails(newEmails);
  };

  // Validación de los correos electrónicos de los miembros
  const validateMemberEmails = () => {
    return memberEmails.length > 0 && memberEmails.every(email => email.trim() !== '' && isValidEmail(email));
  };
  
  const handleValidateEmails = async () => {
    const userEmail = userData?.correo; // Obtener el correo del usuario desde userData
    const validMemberEmails = memberEmails.filter(email => email !== "").map(email => email.trim()); // Filtrar correos vacíos y recortarlos
  
    // Mensaje de depuración para ver los correos
    console.log("Correo del usuario:", userEmail);
    console.log("Correos de los miembros (antes de validación):", memberEmails);
    console.log("Correos de los miembros (después de validación):", validMemberEmails);
  
    // Validar que el correo del usuario y los correos de los miembros no estén vacíos
    if (!userEmail || validMemberEmails.length === 0) {
      console.log("Error: Los correos no están completos.");
      alert("Por favor, ingrese todos los correos.");
      return;
    }
  
    try {
      // Hacer la solicitud al backend para validar los correos
      const response = await axios.post("http://localhost:4000/backend/validateUserSubscription", {
        correo: userEmail,
        memberEmails: validMemberEmails,
      });
  
      // Si la respuesta es exitosa, marcar como validado
      console.log("Validación exitosa", response.data);
      setEmailValidationComplete(true); // Actualizar el estado a 'completado'
    } catch (error) {
      // Manejar los errores
      console.error("Error al validar los correos:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Hubo un error al validar los correos.");
    }
  };

  if (!userData || !planData) {
    return <div>Cargando...</div>;
  }

  const age = calculateAge(userData.fechaNacimiento);
  const userMode = age <= 10 ? "KIDS" : age <= 18 ? "YOUNG" : "ADULTO"; 
  const nextPaymentDate = calculateNextPaymentDate();

  const handleNextStep = () => {
    if (currentStep === 1 && isChecked) {
      if (planData.planName === "Plan premium para 2 personas" || planData.planName === "Plan premium para 3 personas") {
        setCurrentStep(2);
      } else {
        setCurrentStep(3);
      }
    } else if (currentStep === 2 && validateMemberEmails()) {
      setCurrentStep(3);
    }
  };

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
            placeholder={`Correo miembro ${i + 1}`}
          />
          <br />
        </div>
      );
    }
  }

  return (
    <div>
      <h3 className='titlePay'>¡Paga y disfruta de tu curso!</h3>

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

      {currentStep === 2 && (
        <div className="step-container">
          <h2>Miembros del Plan</h2>
          {membersInputs.length > 0 && (
            <>
              <h3>Miembros del plan:</h3>
              {membersInputs}
              <div className="botonPay">
                <button 
                  onClick={() => {
                    if (emailValidationComplete) {
                      setCurrentStep(3); // Avanzamos al siguiente paso
                    } else {
                      handleValidateEmails(); // Validamos los correos
                    }
                  }} 
                  className="next-button" 
                  disabled={!validateMemberEmails()}
                >
                  {emailValidationComplete ? 'Siguiente' : 'Validar correos'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

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
