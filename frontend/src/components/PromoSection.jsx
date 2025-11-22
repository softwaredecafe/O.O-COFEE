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
              src="/images/taller.png"
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
            <h2>¿Te apasiona</h2>
            <h2>el café</h2>
            <h2>y quieres perfeccionar tu técnica?</h2>
          </div>
          
          <motion.button 
            className="subscribe-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/calendario'} 
          >
            ¡Ver nuestras Actividades Futuras!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;