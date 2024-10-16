import "./HeaderYoung.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../images/Logo-White.svg";
import UserProfile from '../../UserProfile/UserProfile'
import Cart from "../../Cart";

function HeaderYoung({ onExploreClick, cartItems, removeItemFromCart }) {
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && storedUser !== "undefined";

  const navigate = useNavigate(); // Hook para redirigir

  const linkHeaders = [
    { name: "Explorar", url: "/", onClick: onExploreClick }, // Cambia la URL según corresponda
    { name: "Comunidad", url: "/Comunidad" },
    { name: "Planes", url: "/YoungPlan" },
    { name: "Cursos", url: "/PlanesKids" },
    { name: "Becas", url: "/Becas" },
  ];
  return (
    <div>
      <header className="headerStructure-Young">
        <div className="logo-Young">
          <img src={logo} />
        </div>
        <div className="listHeader-Young">
          {linkHeaders.map((link, index) => (
            <Link // Utilizamos Link en lugar de <a>
              key={index}
              to={link.url} // Cambiamos href a "to" para que sea manejado por React Router
              className="headerLink-Young"
              onClick={link.onClick || null} // Si existe onClick, lo ejecuta
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="ctaList-Young">
              {/* Si el usuario está logueado, mostrar el perfil, sino los botones */}
              {!isLoggedIn ? (
            <>
              <div className="login-Young">
                <button onClick={() => navigate("/login")}>Inicia Sesion</button>
              </div>
              <div className="Register-Young">
                <button onClick={() => navigate("/register")}>Registrate gratis</button>
              </div>
            </>
          ) : (
            <UserProfile />
          )}
        </div>
        <Cart cartItems={cartItems} removeItemFromCart={removeItemFromCart} />{" "}
        {/* Aquí pasamos el carrito */}
      </header>
    </div>
  );
}
export default HeaderYoung;
