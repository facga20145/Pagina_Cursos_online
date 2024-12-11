import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({
  KidsStyle,
  WhiteStyle,
  removeItemFromCart,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setItems(updatedCart);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = items.filter((_, i) => i !== index);
    setItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Guarda los datos del carrito en localStorage si es necesario
    localStorage.setItem("cart", JSON.stringify(items));

    // Redirige a la página de pago
    navigate("/pago-curso");
    toggleCart(); // Cierra el carrito
  };

  const handleRefresh = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(updatedCart);
    console.log("Carrito actualizado manualmente:", updatedCart);
  };

  return (
    <div className="cart-container">
      <button
        className={`cart-icon ${KidsStyle ? "Kids-Style" : ""} 
        ${WhiteStyle ? "White-Style" : ""}`}
        onClick={toggleCart}
      >
        🛒 {items.length} {/* items.length ya no causará errores */}
      </button>
      {isOpen && (
        <div className="cart-dropdown">
          {items.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <div className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <p>S/ {item.price}</p>
                      </div>
                      <button onClick={() => handleRemoveItem(index)}>
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="checkout-btn" onClick={handleCheckout}>
                Pagar
              </button>
            </>
          )}
          <button className="refresh-icon-btn" onClick={handleRefresh} title="Actualizar">
            🔄
          </button>

          <button className="close-btn" onClick={toggleCart}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
