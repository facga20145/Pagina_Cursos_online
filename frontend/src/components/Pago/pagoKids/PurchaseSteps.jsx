import React, { useState, useEffect } from 'react';
import './PurchaseSteps.css';
import YapeQR from '../../images/yapeQR.jpg';
import axios from 'axios'; // Asegúrate de tener Axios para hacer las peticiones
import { useNavigate } from 'react-router-dom';


export default function PurchaseSteps() {
  const [userData, setUserData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [memberEmails, setMemberEmails] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationComplete, setEmailValidationComplete] = useState(false);
  const navigate = useNavigate();

  // Estado para los detalles de la tarjeta
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expDate: '',
    cvv: ''
  });
  const [validationCode, setValidationCode] = useState('');

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
    let age = today.getFullYear() - birth.getFullYear();
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
    setCardDetails({ name: '', number: '', expDate: '', cvv: '' }); // Reset tarjeta
    setValidationCode(''); // Reset código de validación
  };

  const handleCardDetailChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleValidationCodeChange = (e) => {
    setValidationCode(e.target.value);
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

  const validateMemberEmails = () => {
    return memberEmails.length > 0 && memberEmails.every(email => email.trim() !== '' && isValidEmail(email));
  };

  const handleValidateEmails = async () => {
    const userEmail = userData?.correo;
    const validMemberEmails = memberEmails.filter(email => email !== "").map(email => email.trim());
  
    if (!userEmail || validMemberEmails.length === 0) {
      alert("Por favor, ingrese todos los correos.");
      return;
    }
  
    try {
      // Enviar la solicitud para validar los correos
      const response = await axios.post("http://localhost:4000/backend/validateUserSubscription", {
        correo: userEmail,
        memberEmails: validMemberEmails,
      });
  
      // Guardar los correos validados en el localStorage (temporal)
      localStorage.setItem('validatedUserEmail', userEmail);
      localStorage.setItem('validatedMemberEmails', JSON.stringify(validMemberEmails));
  
      setEmailValidationComplete(true); // Marcar como completado
  
    } catch (error) {
      alert(error.response?.data?.message || "Hubo un error al validar los correos.");
    }
  };

  const handlePayment = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      throw new Error("El usuario no está autenticado. Por favor, inicia sesión.");
    }

    const userId = user.id;

    if (!planData || !planData.planName || !planData.price) {
      throw new Error("No se encontró la información del plan. Por favor, selecciona un plan.");
    }

    const paymentData = {
      paymentMethod,
      planName: planData.planName,
      price: planData.price,
      userId,
    };

    console.log("Datos que se enviarán al backend:", paymentData);

    const response = await axios.post("http://localhost:4000/backend/processPayment", paymentData);

    console.log("Respuesta del backend:", response.data);
    alert("Pago procesado correctamente.");

    if (response.data.redirect) {
      navigate(response.data.redirect); // Redirigir usando React Router
    } else {
      setIsPaymentCompleted(true);
    }
  } catch (error) {
    console.error("Error al procesar el pago:", error.message);
    alert("Ocurrió un error al procesar el pago. Inténtalo nuevamente.");
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
                      setCurrentStep(3); 
                    } else {
                      handleValidateEmails(); 
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
              value="Tarjeta"
              checked={paymentMethod === 'Tarjeta'}
              onChange={handlePaymentChange}
              className="payment-option"
            />
            Tarjeta
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="BilleteraDigital"
              checked={paymentMethod === 'BilleteraDigital'}
              onChange={handlePaymentChange}
              className="payment-option"
            />
            Yape / Plin
          </label>

          {paymentMethod === 'Tarjeta' && (
            <div>
              <label>
                Nombre del Titular:
                <input
                  type="text"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardDetailChange}
                  className="input-field"
                  placeholder="Nombre del titular"
                />
              </label>
              <br />
              <label>
                Número de Tarjeta:
                <input
                  type="text"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardDetailChange}
                  className="input-field"
                  placeholder="Número de tarjeta"
                />
              </label>
              <br />
              <label>
                Fecha de Vencimiento:
                <input
                  type="text"
                  name="expDate"
                  value={cardDetails.expDate}
                  onChange={handleCardDetailChange}
                  className="input-field"
                  placeholder="MM/AA"
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailChange}
                  className="input-field"
                  placeholder="CVV"
                />
              </label>
            </div>
          )}

          {paymentMethod === 'BilleteraDigital' && (
            <div>
              <img src={YapeQR} alt="QR Yape" className="qr-image" />
              <label>
                Código de validación:
                <input
                  type="text"
                  value={validationCode}
                  onChange={handleValidationCodeChange}
                  className="input-field"
                  placeholder="Ingrese el código de validación"
                />
              </label>
            </div>
          )}

          

<div className="botonPay">
<button
  onClick={() => handlePayment()}
  disabled={
    !paymentMethod ||
    (paymentMethod === "Tarjeta" && (!cardDetails.name || !cardDetails.number || !cardDetails.expDate || !cardDetails.cvv)) ||
    (paymentMethod === "BilleteraDigital" && !validationCode)
  }
  className="next-button"
>
  Pagar
</button>


          </div>
        </div>
      )}
    </div>
  );
}
