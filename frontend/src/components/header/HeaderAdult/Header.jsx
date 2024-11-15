import "../../Login/Login";
import "../HeaderAdult/Header.css";
import logo from "../../images/Logo-White.svg";
import LogoKids from "../../images/LogoKids.svg";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import Cart from "../../Carrito/Cart";
import UserProfile from "../../UserProfile/UserProfile";
import { useState } from "react"; // Importamos useState para manejar el estado del menú

export default function Header({
  isKids,
  isWhite,
  onExploreClick,
  cartItems,
  removeItemFromCart,
}) {
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && storedUser !== "undefined";

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú responsive
  const navigate = useNavigate();

  const linkHeaders = [
    { name: "Explorar", url: "/menu", onClick: onExploreClick },
    { name: "Comunidad", url: "/Comunidad" },
    { name: "Planes", url: "/Premium" },
    { name: "Becas", url: "/Beca" },
    { name: "Cursos", url: "/PlanesKids" },
    { name: "Rutas", url: "/RutasPage" }
  ];

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Función para manejar la apertura/cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header
        className={`headerStructure ${isKids ? "kids-version" : ""} ${
          isWhite ? "white-version" : ""
        }`}
      >
        <div
          className={`logo2 ${isKids ? "kids-logo" : ""} ${
            isWhite ? "white-logo" : ""
          }`}
        >
          <img src={isKids ? LogoKids : logo} alt="Logo" />
        </div>

        <div className={`listHeader ${isMenuOpen ? "open" : ""}`}>
          {" "}
          {/* Clase 'open' para abrir el menú */}
          {linkHeaders.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className={`headerLink ${isKids ? "kids-link" : ""} ${
                isWhite ? "white-link" : ""
              }`}
              onClick={link.onClick || null}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="ctaList">
          {!isLoggedIn ? (
            <>
              <div
                className={`login ${isKids ? "login-kids" : ""} ${
                  isWhite ? "login-white" : ""
                }`}
              >
                <button onClick={handleLoginClick}>Inicia Sesión</button>
              </div>
              <div
                className={`Register ${isKids ? "register-Kids" : ""} ${
                  isWhite ? "register-white" : ""
                }`}
              >
                <button onClick={handleRegisterClick}>Regístrate gratis</button>
              </div>
            </>
          ) : (
            <UserProfile />
          )}

          <Cart
            cartItems={cartItems}
            removeItemFromCart={removeItemFromCart}
            KidsStyle={isKids}
            WhiteStyle={isWhite} 
          />
        </div>

        {/* Botón del menú para móviles */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span
            className={`hamburger-icon ${isKids ? "hamburguer-kids" : ""} ${
              isWhite ? "hamburguer-white" : ""
            }`}
          >
            &#9776;
          </span>{" "}
          {/* Icono del menú */}
        </div>
      </header>
    </div>
  );
}
