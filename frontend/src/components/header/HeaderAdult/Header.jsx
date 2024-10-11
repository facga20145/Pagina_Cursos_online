import "../../Login";
import "../HeaderAdult/Header.css";
import logo from "../../images/logo.png";
import { useNavigate, Link } from "react-router-dom";  // Importa Link
import Cart from '../../Cart'; 

export default function Header({ onExploreClick, cartItems, removeItemFromCart }) { 

  const navigate = useNavigate();

  const linkHeaders = [
    { name: 'Explorar', url: '/', onClick: onExploreClick },  // Cambia la URL según corresponda
    { name: 'Comunidad', url: '/Comunidad' },
    { name: 'Planes', url: '/Premium' },
    { name: 'Becas', url: '/Becas' },
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
          <div className="login">
            <button onClick={handleLoginClick}>Inicia Sesion</button>
          </div>
          <div className="Register">
            <button onClick={handleRegisterClick}>Registrate gratis</button>
          </div>
        </div>

        <Cart cartItems={cartItems} removeItemFromCart={removeItemFromCart} /> {/* Aquí pasamos el carrito */}
      </header>
    </div>
  );
}
