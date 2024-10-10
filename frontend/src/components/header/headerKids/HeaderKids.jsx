import React from 'react';
import './HeaderKids.css';
import logoKids from '../../images/logoKids.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate(); 

const linkHeadersKids = [
  { name: 'Explorar', url: '/' },
  { name: 'Comunidad', url: '/Comunidad' },
  { name: 'Planes', url: '/Planes' },
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
        <header className='headerStructureKids'>
            <div className="logo2Kids">
                <img src={logoKids} />
            </div>

            <div className="listHeaderKids">
          {linkHeadersKids.map((link, index) => (
            <a key={index} href={link.url} className="headerLink">
              {link.name}
            </a>
          ))}
        </div>
            <div className="ctaList">
                <div className="loginKids">
                    <button onClick={handleLoginClick}>Inicia Sesion</button>
                </div>

                <div className="RegisterKids">
                    <button onClick={handleRegisterClick}>Registrate</button>
                </div>
            </div>
        </header>
    </div>
  )
}