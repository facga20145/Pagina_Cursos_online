
import "./HeaderKids.css";
import logo from "../../../components/images/LogoKids.svg";
import { useNavigate } from "react-router-dom";
import Cart from "../../Cart";
import UserProfile from '../../UserProfile/UserProfile'

export default function Header({onExploreClick, cartItems, removeItemFromCart}) {
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && storedUser !== "undefined";

  const navigate = useNavigate(); // Hook para redirigir

  const linkHeaders = [
    { name: "Explorar", url: "/" },
    { name: "Comunidad", url: "/Comunidad" },
    { name: "Planes", url: "/KidPlan" },
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
             {/* Si el usuario está logueado, mostrar el perfil, sino los botones */}
             {!isLoggedIn ? (
            <>
              <div className="login-Kids">
                <button onClick={() => navigate("/login")}>Inicia Sesion</button>
              </div>
              <div className="Register-Kids">
                <button onClick={() => navigate("/register")}>Registrate gratis</button>
              </div>
            </>
          ) : (
            <UserProfile />
          )}
        </div>
        <Cart kidsStyle={true} cartItems={cartItems} removeItemFromCart={removeItemFromCart} />{" "}
        {/* Aquí pasamos el carrito */}
      </header>
    </div>
  );
}
