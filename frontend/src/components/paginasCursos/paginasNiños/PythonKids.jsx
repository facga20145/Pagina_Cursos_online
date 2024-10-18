import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/headerKids/HeaderKids';
import Python from '../../images/python10.svg'

export default function PythonKids() {
  return (
    <div>
      <Header/>
      <CursosKids
        title="Curso de Python para Niños"
        releaseDate="Disponible desde el 1 de Diciembre"
        description="¡Descubre la programación con Python! En este curso, aprenderás a escribir código para desarrollar juegos y aplicaciones sencillas."
        imageSrc={Python}
      />
    </div>
  );
}
