import React from 'react';
import { FaSearch } from "react-icons/fa";
import '../Login.jsx'
import './Header.css';
import logo from '../images/logo.png';
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate(); // Hook para redirigir

const linkHeaders = [
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
        <header className='headerStructure'>
            <div className="logo2">
                <img src={logo} />
            </div>

            <div className="listHeader">
          {linkHeaders.map((link, index) => (
            <a key={index} href={link.url} className="headerLink">
              {link.name}
            </a>
          ))}
        </div>
            <div className="ctaList">
                <div className="login">
                    <button onClick={handleLoginClick}>Inicia Sesion</button>
                </div>
            </div>
        </header>
    </div>
  )
}
