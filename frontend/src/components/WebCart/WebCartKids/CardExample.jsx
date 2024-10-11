import React from 'react';
import './Card.css';
import html from '../../images/html.png'
import css from '../../images/css.png'
import java from '../../images/java.png'
import php from '../../images/php.png'
import javascript from '../../images/javascript.png'
import python from '../../images/python.png'


// Componente CardExample que recibe props
function CardExample({ image, title, description, price }) {
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
          <button>COMPRAR</button>
        </div>
      </div>
    </div>
  );
}

// Componente que renderiza una lista de tarjetas
export default function CardList() {
  // Datos de ejemplo para las tarjetas
  const cardData = [
    {
      image:html,
      title: 'HTML',
      description: 'Estructura y contenido de páginas web',
      price: '$10.00'
    },
    {
      image:css,
      title: 'CSS',
      description: 'Estilos visuales de páginas web',
      price: '$15.00'
    },
    {
      image:java,
      title: 'JAVA',
      description: 'Portabilidad y eficiencia en aplicaciones',
      price: '$20.00'
    },
    {
      image:javascript,
      title: 'JAVASCRIPT',
      description: 'Interactividad en páginas del navegador',
      price: '$25.00'
    },
    {
      image: php,
      title: 'PHP',
      description: 'Backend dinámico para sitios web',
      price: '$30.00'
    },
    {
      image: python,
      title: 'PYTHON',
      description: 'Lenguaje simple y versátil, multipropósito',
      price: '$35.00'
    }
  ];

  return (
    <div >
      <h3 className='tittleCourseKids'>Nuestros Cursos en Linea</h3>
      <div className="cardList">
      {cardData.map((card, index) => (
        <CardExample
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          price={card.price}
        />
      ))}
    </div>
    </div>
  );
}
