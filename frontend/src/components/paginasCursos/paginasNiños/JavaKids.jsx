import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/HeaderAdult/Header';
import Java from '../../images/java10.svg'

export default function JavaKids() {
  return (
    <div>
      <Header/>
      <CursosKids
        title="Curso de Java para Niños"
        releaseDate="Disponible desde el 10 de Diciembre"
        description="¡Aprende a programar con Java! Este curso te introducirá en la programación orientada a objetos y en el desarrollo de aplicaciones."
        imageSrc={Java}
      />
    </div>
  );
}
