import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Imágenes de ejemplo para el carrusel (puedes reemplazarlas luego)
  const slides = [
    '/images/1.png',
    '/images/3.png',  
    '/images/4.png',
    '/images/5.png',
    '/images/2.png'
  ];

  // Efecto para cambiar automáticamente las slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero">
      {/* Carrusel de imágenes de fondo */}
      <div className="slideshow">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      {/* Overlay para mejorar legibilidad del texto */}
      <div className="hero-overlay"></div>

      {/* Contenido principal centrado */}
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-title"
        >
          O.O COFFEE
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Join us in seeking quality, truth and accountability in coffee.<br />
          Together, we journey to find the finest and most unique coffees in the world.
        </motion.p>
      </div>

      {/* Indicadores del carrusel */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;