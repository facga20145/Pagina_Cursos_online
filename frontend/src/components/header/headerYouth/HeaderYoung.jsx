
import './HeaderYoung.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/Logo-Young.png'
function HeaderYoung() {
    const navigate = useNavigate(); // Hook para redirigir
    const linkHeaders = [
        { name: 'Explorar', url: '/' },
        { name: 'Comunidad', url: '/Comunidad' },
        { name: 'Planes', url: '/Premium' },
        { name: 'Becas', url: '/Becas' }
      ];
      // Función que redirige al login
const handleLoginClick = () => {
    navigate('/login'); 
  };
  
  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <div>
      <header className='headerStructure-Young'>
            <div className="logo-Young">
                <img src={logo} />
            </div>

            <div className="listHeader-Young">
          {linkHeaders.map((link, index) => (
            <a key={index} href={link.url} className="headerLink">
              {link.name}
            </a>
          ))}
        </div>
            <div className="ctaList-Young">
                <div className="login-Young">
                    <button onClick={handleLoginClick}>Inicia Sesion</button>
                </div>
                <div className="Register-Young">
                    <button onClick={handleRegisterClick}>Registrate gratis</button>
                </div>
            </div>
        </header>
    </div>
  )
}

export default HeaderYoung
