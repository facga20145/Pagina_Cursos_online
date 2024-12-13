import React, { useState, useEffect } from 'react';
import CardList from './CardExample';
import './PlanesKids.css';
import Header from '../../header/HeaderAdult/Header';
import FooterAdult from "../../Footers/FooterAdult/FooterAdult";


export default function PlanesKids() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cargar categorías desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/api/cursos/categorias")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al cargar categorías:", error));
  }, []);

  return (
    <div className="BackPlanes">
      {/* Header con fondo */}
      <Header isWhite={true}/>

      <h2 className="tittleCourseKids">Nuestros Cursos en Línea</h2>

      {/* Filtros de categorías */}
      <div className="categoryFilters">
        <button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? 'active' : ''}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category.idCategoria}
            onClick={() => setSelectedCategory(category.idCategoria)}
            className={selectedCategory === category.idCategoria ? 'active' : ''}
          >
            {category.NombreCategoria}
          </button>
        ))}
      </div>

      {/* Lista de tarjetas */}
      <CardList selectedCategory={selectedCategory} />
      <FooterAdult />
    </div>
    
    
  );
}
