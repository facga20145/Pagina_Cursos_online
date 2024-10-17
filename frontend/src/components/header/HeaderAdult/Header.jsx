import "../../Login/Login";
import "../HeaderAdult/Header.css";
import logo from "../../images/Logo-White.svg";
import { useNavigate, Link } from "react-router-dom";  // Importa Link
import Cart from '../../Cart'; 
import UserProfile from '../../UserProfile/UserProfile'

export default function Header({ onExploreClick, cartItems, removeItemFromCart }) { 
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = storedUser && storedUser !== "undefined";

  const navigate = useNavigate();

  const linkHeaders = [
    { name: 'Explorar', url: '/', onClick: onExploreClick },  // Cambia la URL según corresponda
    { name: 'Comunidad', url: '/Comunidad' },
    { name: 'Planes', url: '/Premium' },
    { name: 'Becas', url: '/Beca' },
    { name: 'Cursos', url: '/PlanesKids' }
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <header className='headerStructure'>
        <div className="logo2">
          <img src={logo} />
        </div>

        <div className="listHeader">
          {linkHeaders.map((link, index) => (
            <Link  // Utilizamos Link en lugar de <a>
              key={index}
              to={link.url}  // Cambiamos href a "to" para que sea manejado por React Router
              className="headerLink"
              onClick={link.onClick || null}  // Si existe onClick, lo ejecuta
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="ctaList">
        {/* Si el usuario está logueado, mostrar el perfil, sino los botones */}
        {!isLoggedIn ? (
            <>
              <div className="login">
                <button onClick={() => navigate("/login")}>Inicia Sesion</button>
              </div>
              <div className="Register">
                <button onClick={() => navigate("/register")}>Registrate gratis</button>
              </div>
            </>
          ) : (
            <UserProfile />
          )}
        </div>

        <Cart cartItems={cartItems} removeItemFromCart={removeItemFromCart} /> {/* Aquí pasamos el carrito */}
      </header>
    </div>
  );
}
