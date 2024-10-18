import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/headerKids/HeaderKids';
import JavaScript from '../../images/javascript10.svg'

export default function JavascriptKids() {
  return (
    <div>
      <Header/>
      <CursosKids
        title="Curso de JavaScript para Niños"
        releaseDate="Disponible desde el 5 de Diciembre"
        description="¡Agrega interactividad a tus páginas web! En este curso de JavaScript, aprenderás a crear dinámicas y animaciones en tus sitios."
        imageSrc={JavaScript}
      />
    </div>
  );
}
