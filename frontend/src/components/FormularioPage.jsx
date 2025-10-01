import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FormularioPage.css';

const FormularioPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    experiencia: '',
    visitaCafeteria: false,
    nombreCafeteria: '',
    comprobante: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Lógica backend posterior
  };

  return (
    <div className="formulario-page">
      {/* Header con logo y menú hamburguesa */}
      <header className="formulario-header">
        <div className="logo">
          <h2>O.O COFFEE</h2>
        </div>
        
        <button 
          className="menu-toggle-form"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Menú desplegable */}
        <nav className={`vertical-nav-form ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/formulario">Formulario</a></li>
            <li><a href="#pago">Pago</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
      </header>

      {/* Fondo con imagen */}
      <div className="formulario-background"></div>

      {/* Formulario central */}
      <motion.div 
        className="formulario-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="formulario-card">
          <h2>FORMULARIO DE INSCRIPCIÓN</h2>
          
          <form onSubmit={handleSubmit} className="inscripcion-form">
            {/* Campos básicos */}
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="NOMBRE COMPLETO"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="correo"
                placeholder="CORREO ELECTRÓNICO"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="telefono"
                placeholder="TELÉFONO"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Experiencia en catación */}
            <div className="form-group">
              <select
                name="experiencia"
                value={formData.experiencia}
                onChange={handleInputChange}
                required
              >
                <option value="">EXPERIENCIA EN CATACIÓN</option>
                <option value="principiante">PRINCIPIANTE</option>
                <option value="medio">MEDIO</option>
                <option value="profesional">PROFESIONAL</option>
              </select>
            </div>

            {/* Visita de cafetería */}
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="visitaCafeteria"
                  checked={formData.visitaCafeteria}
                  onChange={handleInputChange}
                />
                ¿NOS VISITA DE ALGUNA CAFETERÍA?
              </label>
            </div>

            {/* Nombre de cafetería (condicional) */}
            {formData.visitaCafeteria && (
              <div className="form-group">
                <input
                  type="text"
                  name="nombreCafeteria"
                  placeholder="NOMBRE DE LA CAFETERÍA"
                  value={formData.nombreCafeteria}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Instrucciones de pago */}
            <div className="pago-instructions">
              <h3>INSTRUCCIONES DE PAGO</h3>
              <p>Realiza el pago de $50 USD por transferencia bancaria:</p>
              <div className="bank-details">
                <p><strong>Banco:</strong> International Coffee Bank</p>
                <p><strong>Cuenta:</strong> 123-456789-001</p>
                <p><strong>Beneficiario:</strong> Catación Café Especial</p>
                <p><strong>SWIFT:</strong> ICBKUS33</p>
              </div>
            </div>

            {/* Subir comprobante */}
            <div className="form-group file-group">
              <label>SUBIR COMPROBANTE DE PAGO</label>
              <input
                type="file"
                name="comprobante"
                onChange={handleInputChange}
                accept="image/*"
                required
              />
            </div>

            {/* Botón de enviar */}
            <button type="submit" className="submit-btn">
              ENVIAR FORMULARIO
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FormularioPage;