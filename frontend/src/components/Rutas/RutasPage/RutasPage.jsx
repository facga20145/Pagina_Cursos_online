import React from 'react'
import './RutasPage.css'
import Header from '../../header/HeaderAdult/Header'
import RutaComponent from '../../Rutas/RutasObject';
import html from '../../images/html10.svg'
import css from '../../images/css10.svg'
import python from '../../images/python10.svg'
import machine from '../../images/machine10.png'
import swift from '../../images/swift10.svg'
import android from '../../images/android10.svg'

export default function RutasPage() {

    const rutasData = [
        {
          rutaTitle: "Ruta de Programación Web",
          rutaText: "Aprende los fundamentos del desarrollo web desde HTML hasta frameworks avanzados.",
          cursosInfo: [
            {
              imagen: html,
              nombre: "Introducción a HTML",
              descripcion: "Domina el lenguaje de marcado para construir la estructura de sitios web."
            },
            {
              imagen: css,
              nombre: "CSS Avanzado",
              descripcion: "Aprende a estilizar y animar tus sitios web de manera profesional."
            }
          ]
        },
        {
          rutaTitle: "Ruta de Ciencia de Datos",
          rutaText: "Explora el análisis de datos y técnicas de aprendizaje automático.",
          cursosInfo: [
            {
              imagen: python,
              nombre: "Introducción a Python",
              descripcion: "Curso básico de Python enfocado en análisis de datos."
            },
            {
              imagen: machine,
              nombre: "Machine Learning",
              descripcion: "Conceptos fundamentales y técnicas de machine learning."
            }
          ]
        },
        {
          rutaTitle: "Ruta de Desarrollo Móvil",
          rutaText: "Aprende a crear aplicaciones móviles para Android e iOS.",
          cursosInfo: [
            {
              imagen: swift,
              nombre: "Fundamentos de Swift",
              descripcion: "Desarrollo de aplicaciones móviles para iOS con Swift."
            },
            {
              imagen: android,
              nombre: "Introducción a Android",
              descripcion: "Aprende a crear aplicaciones móviles en Android."
            }
          ]
        }
      ];
  return (
    <div className='rutasContainerGeneral'>
      <Header/>
        {rutasData.map((ruta) => (
            <RutaComponent
            rutaTitle={ruta.rutaTitle}
            rutaText={ruta.rutaText}
            cursosInfo={ruta.cursosInfo}
            />
        ))}
    </div>
  )
}
