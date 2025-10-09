import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Barista.css';

const Barista = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Leo',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b1.png',
      path: '/leo'
    },
    {
      title: 'David',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b2.png',
      path: '/catador'
    },
    {
      title: 'David',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b3.png',
      path: '/tostador'
    },
    {
      title: 'prueba',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b4.png',
      path: '/productor'
    },
    {
      title: 'Teco',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b5.png',
      path: '/exportador'
    },
    {
      title: 'Cristian',
      description: 'Barista con 5 años de experiencia en la preparación de bebidas artesanales. Especialista en café de especialidad y arte latte.',
      image: '/images/b6.png',
      path: '/investigador'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="barista-section">
      <div className="container">
        <h2 className="section-title">EL ARTE DEL BARISTA</h2>
        <p className="section-subtitle">
          Descubre la magia detrás de cada taza perfecta y los secretos de la preparación profesional
        </p>

        <div className="roles-grid">
          {roles.map((role, index) => (
            <div
              key={index}
              className="role-card"
              style={{ backgroundImage: `url(${role.image})` }}
              onClick={() => handleCardClick(role.path)}
            >
              <div className="card-top-text">{role.title}</div>
              <div className="card-content">
                <p className="card-description">{role.description}</p>
                <button className="card-button">
                  Ver más <span className="arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barista;