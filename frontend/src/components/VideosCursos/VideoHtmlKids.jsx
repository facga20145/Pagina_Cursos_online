import React from 'react';
import VideosKids from './VideosKids/VideosKids'

export default function App() {
  const conceptoHTML = (
    <>
      Este curso de HTML te enseñará las bases para construir páginas web. <br />
      ¡Aprenderemos juntos a crear cosas increíbles! <br /><br />
      1. Aprenderemos qué es HTML y por qué es tan importante. <br />
      2. Crearemos nuestra primera página web con etiquetas básicas. <br />
      3. Añadiremos títulos, párrafos y listas a nuestra página. <br />
      4. Usaremos imágenes y enlaces para hacer nuestra página más divertida. <br />
      5. Descubriremos cómo hacer que nuestra página sea más organizada con tablas. <br />
      6. Al final, veremos cómo compartir nuestra página con el mundo.
    </>
  );
  

  
  return (
    <div>
      <VideosKids 
        videoId="Ch1GG4xM8nw" 
        titleVideo="Actividades a hacer en este curso"
        concepto={conceptoHTML} 
      />
    </div>
  )
}
