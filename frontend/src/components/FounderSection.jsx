import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FounderSection.css';

// 1. DATOS DEL EQUIPO (Edita aquí la info de los 3 miembros)
const teamData = [
  {
    id: 1,
    subtitle: "FOUNDER and BREWING SCA CERTIFIED",
    nameLines: ["MARLON", "RENDÓN"],
    description: "13 AÑOS EN EL CAFÉ DE ESPECIALIDAD. CERTIFICADO SCA Y JUEZ EN COMPETENCIAS NACIONALES.",
    highlight: "6TO LUGAR NACIONAL AEROPRESS 2024",
    footer: "FUNDADOR DE PUNTO COFFEE (O.O COFFEE)",
    image: "/images/marlon1.png" 
  },
  {
    id: 2,
    subtitle: "Founder and Marketing Manager",
    nameLines: ["ALEJANDRA", "CORDERO"],
    description: "Comunicadora y Marketing Manager, movida por ideas creativas y buenas tazas de café.",
    highlight: "Marketing Manager",
    footer: "FUNDADORA DE PUNTO COFFEE (O.O COFFEE)",
    image: "/images/actividades/ALE.png"
  },
  {
    id: 3,
    subtitle: "COLABORADOR AND SOFTWARE DEVELOPER",
    nameLines: ["ALEXANDER", "GUZMAN"], // Nombre ejemplo
    description: "Desarrollador de software, movido por lógica, creatividad y mucho café.",
    highlight: "SOFTWARE DEVELOPER",
    footer: "COLABORADOR DE PUNTO COFFEE (O.O COFFEE)",
    image: "/images/actividades/alex.png" // Asegúrate de tener esta imagen
  }
];

const FounderSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTOMÁTICO: Cambia cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamData.length);
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(timer);
  }, []);

  const currentMember = teamData[currentIndex];

  // Variantes para el efecto de desvanecimiento (Fade)
  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <section className="founder-section">
      <div className="founder-centered-container">
        
        {/* --- IZQUIERDA: Texto Dinámico --- */}
        <div className="founder-text-box">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentMember.id} // Clave vital para la animación
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <span className="subtitle">{currentMember.subtitle}</span>

              {currentMember.nameLines.map((line, index) => (
                <h2 key={index}>{line}</h2>
              ))}
              
              <div className="description">
                <p>{currentMember.description}</p>
                <p className="highlight">{currentMember.highlight}</p>
                <p>{currentMember.footer}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <motion.button 
            className="black-block-btn"
            whileHover={{ scale: 1.02, backgroundColor: "#333" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/blog'} 
          >
            CONOCE AL EQUIPO
          </motion.button>
        </div>

        {/* --- DERECHA: Imagen Dinámica --- */}
        <div className="founder-image-box">
          <AnimatePresence mode='wait'>
            <motion.img 
              key={currentMember.id}
              src={currentMember.image}
              alt={currentMember.nameLines.join(" ")}
              className="profile-image"
              // Animación de imagen suave
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }} 
            />
          </AnimatePresence>
          
          {/* Texto decorativo Outline */}
          <div className="outline-decoration">
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderSection;