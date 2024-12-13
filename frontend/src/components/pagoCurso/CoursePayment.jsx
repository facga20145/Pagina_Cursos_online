import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YapeQR from "../images/yapeQR.jpg"; // Importar la imagen de Yape
import "./CoursePayment.css";
import Header from "../header/HeaderAdult/Header";
import FooterAdult from "../Footers/FooterAdult/FooterAdult";


export default function CoursePayment() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expDate: "", cvv: "" });
  const [validationCode, setValidationCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProceedToPayment = () => {
    setShowPaymentForm(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Por favor, inicia sesión para continuar.");
        navigate("/login");
        return;
      }
  
      // Determinar idTipoPago según el método de pago seleccionado
      const idTipoPago = selectedPaymentMethod === "Tarjeta" ? 1 : selectedPaymentMethod === "BilleteraDigital" ? 2 : null;
  
      if (!idTipoPago) {
        alert("Método de pago no válido.");
        return;
      }
  
      // Validaciones adicionales según el método de pago
      if (
        selectedPaymentMethod === "Tarjeta" &&
        (!cardDetails.name || !cardDetails.number || !cardDetails.expDate || !cardDetails.cvv)
      ) {
        alert("Por favor, completa todos los datos de la tarjeta.");
        return;
      }
  
      if (selectedPaymentMethod === "BilleteraDigital" && !validationCode) {
        alert("Por favor, ingresa el código de validación.");
        return;
      }
  
      const paymentData = {
        userId: user.id,
        cartItems,
        idTipoPago, // Enviar el idTipoPago al backend
        cardDetails: selectedPaymentMethod === "Tarjeta" ? cardDetails : null,
        validationCode: selectedPaymentMethod === "BilleteraDigital" ? validationCode : null,
      };
  
      console.log("Datos enviados al backend:", paymentData);
  
      const response = await axios.post("http://localhost:4000/backend/processCoursePayment", paymentData);
  
      console.log("Respuesta del backend:", response.data);
  
      alert("Pago realizado exitosamente.");
      localStorage.removeItem("cart");
      // Redirigir al curso comprado
    if (cartItems.length === 1) {
        navigate(`/curso/${cartItems[0].id}`); // Si es un solo curso
      } else {
        navigate("/PlanesKids"); // Si son varios cursos, redirige a la página de todos los cursos
      }

    } catch (error) {
      console.error("Error al procesar el pago:", error.response || error);
      alert(
        `Error al procesar el pago: ${
          error.response?.data?.message || error.message || "Error desconocido"
        }`
      );
    }
  };
  

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setCardDetails({ name: "", number: "", expDate: "", cvv: "" });
    setValidationCode("");
  };

  const handleCardDetailChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleValidationCodeChange = (e) => {
    setValidationCode(e.target.value);
  };

  if (cartItems.length === 0) {
    return (
      <>
            <Header isWhite={true}/>
            <div className="empty-cart-container">
          <p className="empty-cart">Tu carrito está vacío.</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header isWhite={true}/>
      <div className="payment-container">
        {!showPaymentForm ? (
          <>
            <h1 className="payment-title">Resumen de tu carrito</h1>
            <div className="cart-summary">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>S/ {item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <div className="total-amount">
              <h2>Total: S/ {totalAmount.toFixed(2)}</h2>
            </div>
            <button className="confirm-btn" onClick={handleProceedToPayment}>
              Proceder al pago
            </button>
          </>
        ) : (
          <>
            <h1 className="payment-title">Selecciona tu método de pago</h1>
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="Tarjeta"
                  checked={selectedPaymentMethod === "Tarjeta"}
                  onChange={handlePaymentChange}
                />
                Tarjeta
              </label>
              <label>
                <input
                  type="radio"
                  value="BilleteraDigital"
                  checked={selectedPaymentMethod === "BilleteraDigital"}
                  onChange={handlePaymentChange}
                />
                Yape / Plin
              </label>
            </div>

            {selectedPaymentMethod === "Tarjeta" && (
              <div className="card-details">
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

            {selectedPaymentMethod === "BilleteraDigital" && (
              <div className="wallet-details">
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

            <button
              className="confirm-btn"
              onClick={handleConfirmPayment}
              disabled={
                !selectedPaymentMethod ||
                (selectedPaymentMethod === "Tarjeta" && (!cardDetails.name || !cardDetails.number || !cardDetails.expDate || !cardDetails.cvv)) ||
                (selectedPaymentMethod === "BilleteraDigital" && !validationCode)
              }
            >
              Confirmar y Pagar
            </button>
          </>
        )}
      </div>
      <FooterAdult />
    </div>
  );
}
