import React from "react";
import { FaSearch } from "react-icons/fa";
import "./HeaderKids.css";
import logo from "../../../components/images/LogoKids.svg";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Cart from "../../Cart";

export default function Header({onExploreClick, cartItems, removeItemFromCart}) {
  const navigate = useNavigate(); // Hook para redirigir

  const linkHeaders = [
    { name: "Explorar", url: "/" },
    { name: "Comunidad", url: "/Comunidad" },
    { name: "Planes", url: "/premium" },
    { name: "Cursos", url: "/planesKids" },
    { name: "Becas", url: "/Becas" },
  ];

  // Función que redirige al login
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <div>
      <header className="headerStructureKids">
        <div className="logo2Kids">
          <img src={logo} />
        </div>
        <div className="listHeaderKids">
          {linkHeaders.map((link, index) => (
            <a key={index} href={link.url} className="headerLink-Kids">
              {link.name}
            </a>
          ))}
        </div>
        <div className="ctaList-Kids">
          <div className="login-Kids">
            <button onClick={handleLoginClick}>Inicia Sesion</button>
          </div>
          <div className="Register-Kids">
            <button onClick={handleRegisterClick}>Registra</button>
          </div>
        </div>
        <Cart kidsStyle={true} cartItems={cartItems} removeItemFromCart={removeItemFromCart} />{" "}
        {/* Aquí pasamos el carrito */}
      </header>
    </div>
  );
}
