// Cart.js
import { useState } from "react";
import "./Cart.css";

export default function Cart({
  kidsStyle,
  cartItems = [],
  removeItemFromCart,
}) {
  // Inicializa cartItems como array vacío por defecto
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cart-container">
      <button
        className={`cart-icon ${kidsStyle ? "Kids-Style" : ""}`}
        onClick={toggleCart}
      >
        🛒 {cartItems.length} {/* cartItems.length ya no causará errores */}
      </button>
      {isOpen && (
        <div className="cart-dropdown">
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.title} - {item.price}
                  <button onClick={() => removeItemFromCart(index)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={toggleCart}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
