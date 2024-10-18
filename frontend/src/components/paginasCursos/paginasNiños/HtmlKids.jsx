import React from 'react';
import CursosKids from '../../cursos/cursosKids/CursosKids';
import Header from '../../header/headerKids/HeaderKids';
import Html from '../../images/html10.svg'
import VideoHtmlKids from '../../VideosCursos/VideoHtmlKids'

export default function HtmlKids() {
  return (
    <div>
    <Header/>
      <VideoHtmlKids/>
      <CursosKids
        title="Curso de HTML para Niños"
        releaseDate="Disponible desde el 1 de Noviembre"
        description="¡Aprende a crear la estructura básica de páginas web! Con este curso de HTML, entenderás cómo organizar texto, imágenes y otros contenidos para construir tu propio sitio web."
        imageSrc={Html}
      />
    </div>
  );
}
