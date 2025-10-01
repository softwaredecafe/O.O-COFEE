import React from 'react';
import { motion } from 'framer-motion';
import './FounderSection.css';

const FounderSection = () => {
  // Función para redirigir a /blog
  const redirectToBlog = () => {
    window.location.href = '/blog';
  };

  return (
    <section className="founder-section">
      {/* Título TEAM centrado */}
      <motion.h2 
        className="team-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        TEAM
      </motion.h2>

      <div className="founder-container">
        {/* Contenido a la izquierda */}
        <motion.div 
          className="founder-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3>MARLON RENDON</h3>
          <p className="title">Fundador</p>
          
          <div className="description">
            <p>13 AÑOS EN EL CAFÉ DE ESPECIALIDAD CON LOGROS EN MÚLTIPLES CATEGORIAS, CERTIFICADO SCA Y 
                JUEZ EN COMPETENCIAS NACIONALES, STO LUGAR NACIONAL DE AEROPRESS 2024, FUNDADOR
                 DE PUNTO COFFEE (O.O COFFEE)</p>
          </div>
          
          <motion.button 
            className="know-more-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={redirectToBlog} // Redirección a /blog
          >
            Conoce mas...
          </motion.button>
        </motion.div>
        
        {/* Imagen a la derecha */}
        <motion.div 
          className="founder-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
              src="/images/perfil.png"
              alt="Marlon Rendon - Co Fundador" 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;