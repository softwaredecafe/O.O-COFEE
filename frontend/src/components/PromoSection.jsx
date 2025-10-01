import React from 'react';
import { motion } from 'framer-motion';
import './PromoSection.css';

const PromoSection = () => {
  return (
    <section className="promo-section">
      <div className="promo-container">
        {/* Parte izquierda - Imagen */}
        <motion.div 
          className="promo-image-container"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="promo-image">
            <img 
              src="/images/mono.png"
              alt="Coffee tasting event" 
            />
          </div>
        </motion.div>

        {/* Parte derecha - Texto y botón */}
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="main-text">
            <h2>La cata</h2>
            <h2>amigable</h2>
            <h2>de septiembre</h2>
            <h2>esta cerca</h2>
          </div>
          
          <motion.button 
            className="subscribe-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/formulario'} // Redirección directa
          >
            ¡INSCRIBETE YA!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;