import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

import logoImage from '/images/beige.png';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header transparent ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo con imagen y texto */}
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="logo-container">
            <img 
              src={logoImage} 
              alt="O.O Coffee Logo" 
              className="logo-image"
            />
            <h2>COFFEE</h2>
          </div>
        </motion.div>
        
        {/* Menú hamburguesa para móvil */}
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Menú vertical - se oculta al hacer scroll */}
        {!isScrolled && (
          <nav className={`vertical-nav ${isMenuOpen ? 'open' : ''}`}>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <li><a href="/home">Inicio</a></li>
              <li><a href="/formulario">Cataciones</a></li>
              <li><a href="/galeria">Galeria</a></li>
              <li><a href="/blog">Coffee Blog</a></li>
              <li><a href="/calendario">Actividades</a></li>
              <li><a href="/roles">Conocenos</a></li>
            </motion.ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;