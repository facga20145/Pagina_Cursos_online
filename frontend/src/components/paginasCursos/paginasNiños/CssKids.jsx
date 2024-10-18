import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/headerKids/HeaderKids';
import Css from '../../images/css10.svg'


export default function CssKids() {
  return (
    <div>
      <Header/>
      <CursosKids
        title="Curso de CSS para Niños"
        releaseDate="Disponible desde el 20 de Noviembre"
        description="¡Da estilo a tus páginas web! En este curso de CSS, aprenderás a diseñar y dar formato a tus proyectos web con colores, fuentes y layout."
        imageSrc={Css}
      />
    </div>
  );
}
