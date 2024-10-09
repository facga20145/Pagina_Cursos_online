import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';

export default function SkullModel() {
  const group = useRef();
  
  // Estado para manejar las animaciones actuales
  const [currentAnimation, setCurrentAnimation] = useState('walk'); // Empezamos con 'idle'
  
  // Cargamos el modelo y las animaciones
  const { scene, animations } = useGLTF('/modelos/REviillBoss.glb');
  const { actions } = useAnimations(animations, group);

  // Configuración inicial del modelo (escala y rotación)
  useEffect(() => {
    scene.scale.set(0.6, 0.6, 0.6);  // Ajustamos la escala
    scene.position.set(0, -1.5, 0);
    scene.rotation.y = Math.PI;      // Ajustamos la rotación para que mire al frente
  }, [scene]);

  // Ciclo automático de animaciones
  useEffect(() => {
    if (actions) {
      const availableAnimations = [ 'walk', 'attack']; // Lista de animaciones disponibles
      let animationIndex = 0;

      // Función para cambiar de animación
      const switchAnimation = () => {
        const animationName = availableAnimations[animationIndex];
        setCurrentAnimation(animationName);
        animationIndex = (animationIndex + 1) % availableAnimations.length; // Cambia al siguiente
      };

      // Cambiamos la animación cada 5 segundos
      const interval = setInterval(switchAnimation, 5000);

      return () => clearInterval(interval); // Limpiamos el intervalo al desmontar el componente
    }
  }, [actions]);

  // Ejecutar la animación cuando cambie
  useEffect(() => {
    if (actions && actions[currentAnimation]) {
      actions[currentAnimation].reset().fadeIn(0.5).play();
    }

    return () => {
      if (actions && actions[currentAnimation]) {
        actions[currentAnimation].fadeOut(0.5);
      }
    };
  }, [currentAnimation, actions]);

  return (
    <>
      <primitive ref={group} object={scene} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </>
  );
}
