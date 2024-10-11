import React, { useState }  from 'react';
import './Card.css';
import html from '../../images/html.png'
import css from '../../images/css.png'
import java from '../../images/java.png'
import php from '../../images/php.png'
import javascript from '../../images/javascript.png'
import python from '../../images/python.png'
import Header from '../../header/HeaderAdult/Header';

function CardExample({ image, title, description, price, addToCart }) {
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
          <button onClick={addToCart}>COMPRAR</button> {/* Llamamos a addToCart */}
        </div>
      </div>
    </div>
  );
}

export default function CardList() {
  const [cartItems, setCartItems] = useState([]); // Estado del carrito

  const cardData = [
    { image: html, title: 'HTML', description: 'Estructura y contenido de páginas web', price: '$10.00' },
    { image: css, title: 'CSS', description: 'Estilos visuales de páginas web', price: '$15.00' },
    { image: java, title: 'JAVA', description: 'Portabilidad y eficiencia en aplicaciones', price: '$20.00' },
    { image: javascript, title: 'JAVASCRIPT', description: 'Interactividad en páginas del navegador', price: '$25.00' },
    { image: php, title: 'PHP', description: 'Backend dinámico para sitios web', price: '$30.00' },
    { image: python, title: 'PYTHON', description: 'Lenguaje simple y versátil, multipropósito', price: '$35.00' },
  ];

  // Agregamos console.log para verificar que el carrito está funcionando
  console.log("Carrito:", cartItems);

  // Función para agregar un ítem al carrito
  const addItemToCart = (item) => {
    console.log("Agregando al carrito:", item);
    setCartItems([...cartItems, item]);
  };

  // Función para eliminar un ítem del carrito
  const removeItemFromCart = (index) => {
    console.log("Eliminando del carrito:", index);
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  return (
    <>
      {/* Pasamos el estado del carrito y la función al Header */}
      <Header 
        cartItems={cartItems} 
        removeItemFromCart={removeItemFromCart} 
      /> 

      <div>
        <h3 className='tittleCourseKids'>Nuestros Cursos en Línea</h3>

        {/* Renderizar la lista de tarjetas */}
        <div className="cardList">
          {cardData.map((card, index) => (
            <CardExample
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              price={card.price}
              addToCart={() => addItemToCart(card)} // Pasamos la función addToCart
            />
          ))}
        </div>
      </div>
    </>
  );
}