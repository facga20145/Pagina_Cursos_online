import React from 'react';
import { FaSearch } from "react-icons/fa";
import './HeaderKids.css';
import logo from '../../../components/images/logoKids.png';
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import Cart from '../../Cart'

export default function Header(onExploreClick, cartItems, removeItemFromCart) {
  const navigate = useNavigate(); // Hook para redirigir

const linkHeaders = [
  { name: 'Explorar', url: '/' },
  { name: 'Comunidad', url: '/Comunidad' },
  { name: 'Planes', url: '/premium' },
  { name: 'Cursos', url: '/planesKids' },
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
                <img src={logo} />
            </div>

            <div className="listHeaderKids">
          {linkHeaders.map((link, index) => (
            <a key={index} href={link.url} className="headerLink-Kids">
              {link.name}
            </a>
          ))}
        </div>
            <div className="ctaListKids">
                <div className="loginKids">
                    <button onClick={handleLoginClick} className='loginJugo'>Inicia Sesion</button>
                    <button onClick={handleRegisterClick} >Registra</button>
                </div>
            </div>
           {/* /*  <Cart cartItems={cartItems} removeItemFromCart={removeItemFromCart} /> {/* Aquí pasamos el carrito */} 
        </header>
    </div>
  )
}
