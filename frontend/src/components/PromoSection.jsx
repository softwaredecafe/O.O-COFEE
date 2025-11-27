import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PromoSection.css';

// Datos de las actividades 
const promoData = [
  {
    id: 1,
    image: "/images/actividades/taller.png", 
    textLines: [
      "¿Te apasiona",
      "el café",
      "y quieres perfeccionar tu técnica?"
    ],
    buttonLink: "/calendario"
  },

  {
    id: 2,
    image: 'images/actividades/2.png',
    textLines: [
      "jingle cupping",
      "taller sensorial",
      ],
    buttonLink: "/calendario"
  },

  {
    id: 3,
    image: 'images/actividades/teco2.png', 
    textLines: [
      "Tazas Endiabladas",
      "con TECO HOUSE",
    ],
    buttonLink: "/calendario"
  }
];

// Variantes para la animación de difuminado (fade) cíclico
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const PromoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Temporizador para rotar automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoData.length);
    }, 5000); // Cambia 5000 por el tiempo en milisegundos que prefieras

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  const currentActivity = promoData[currentIndex];

  return (
    <section className="promo-section">
      <div className="promo-container">
        {/* Parte izquierda - Imagen */}
        {/* Mantenemos tu contenedor original con la animación de entrada inicial */}
        <motion.div 
          className="promo-image-container"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="promo-image">
            {/* Usamos AnimatePresence para controlar la transición entre imágenes */}
            {/* mode="wait" asegura que la imagen vieja salga antes de que entre la nueva */}
            <AnimatePresence mode='wait'>
              <motion.img 
                key={currentActivity.id} // La 'key' única es vital para que Framer detecte el cambio
                src={currentActivity.image}
                alt="Actividad promocional"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }} // Duración del difuminado
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Parte derecha - Texto y botón */}
        {/* Mantenemos tu contenedor original con la animación de entrada inicial */}
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="main-text">
             {/* Usamos AnimatePresence también para el bloque de texto */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentActivity.id} // Usamos la misma key para sincronizar con la imagen
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {/* Mapeamos las líneas de texto para mantener tus 3 <h2> separados */}
                {currentActivity.textLines.map((line, index) => (
                  <h2 key={index}>{line}</h2>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* El botón permanece constante, no necesita rotar */}
          <motion.button 
            className="subscribe-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = currentActivity.buttonLink} 
          >
            ¡Ver nuestras Actividades Futuras!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;