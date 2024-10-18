import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import './Card.css';
import html from '../../images/html.png';
import css from '../../images/css.png';
import java from '../../images/java.png';
import php from '../../images/php.png';
import javascript from '../../images/javascript.png';
import python from '../../images/python.png';
import Header from '../../header/HeaderAdult/Header';

function CardExample({ image, title, description, price, link, addToCart }) {
  const handleAddToCart = () => {
    addToCart(); // Agrega el curso al carrito
  };

  return (
    <div className="CardGeneral">
      <div className='cardContainer'>
        <div className="card">
          <img src={image} alt={title} />
          <h3 className='title'>{title}</h3>
          <div className="column">
            <h4 className='description'>{description}</h4>
            <h4 className='price'>{price}</h4>
          </div>
          <Link to={link}> {/* Usamos Link para la navegación */}
            <button onClick={handleAddToCart}>COMPRAR</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CardList() {
  const [cartItems, setCartItems] = useState([]); // Estado del carrito

  const cardData = [
    { image: html, title: 'HTML', description: 'Estructura y contenido de páginas web', price: '$10.00', link: '/html-course' },
    { image: css, title: 'CSS', description: 'Estilos visuales de páginas web', price: '$15.00', link: '/css-course' },
    { image: java, title: 'JAVA', description: 'Portabilidad y eficiencia en aplicaciones', price: '$20.00', link: '/java-course' },
    { image: javascript, title: 'JAVASCRIPT', description: 'Interactividad en páginas del navegador', price: '$25.00', link: '/javascript-course' },
    { image: php, title: 'PHP', description: 'Backend dinámico para sitios web', price: '$30.00', link: '/php-course' },
    { image: python, title: 'PYTHON', description: 'Lenguaje simple y versátil, multipropósito', price: '$35.00', link: '/python-course' },
  ];

  // Función para agregar un ítem al carrito
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Función para eliminar un ítem del carrito
  const removeItemFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  return (
    <>
      <Header 
        cartItems={cartItems} 
        removeItemFromCart={removeItemFromCart} 
        isWhite={true}
      /> 

      <div>
        <h3 className='tittleCourseKids'>Nuestros Cursos en Línea</h3>

        <div className="cardList">
          {cardData.map((card, index) => (
            <CardExample
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              price={card.price}
              link={card.link} // Añadimos el enlace del curso
              addToCart={() => addItemToCart(card)} // Pasamos la función addToCart
            />
          ))}
        </div>
      </div>
    </>
  );
}
