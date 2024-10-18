import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/headerKids/HeaderKids';
import Php from '../../images/php10.svg'

export default function PhpKids() {
  return (
    <div>
      <Header/>
      <CursosKids
        title="Curso de PHP para Niños"
        releaseDate="Disponible desde el 15 de Noviembre"
        description="¡Aprende a programar aplicaciones web dinámicas! Este curso de PHP te enseñará a interactuar con bases de datos y crear sitios web interactivos."
        imageSrc={Php}
      />
    </div>
  );
}
