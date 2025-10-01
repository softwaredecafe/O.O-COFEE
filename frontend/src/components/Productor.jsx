import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Productor.css';

const Productor = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'BARISTA',
      description: 'Maestros del arte latte y la preparación perfecta. Transforman granos en experiencias únicas.',
      image: '/images/prueba.gif',
      path: '/barista'
    },
    {
      title: 'CATADOR',
      description: 'Expertos sensoriales que analizan y evalúan la calidad del café mediante técnicas profesionales.',
      image: '/images/carta2.gif',
      path: '/catador'
    },
    {
      title: 'TOSTADOR',
      description: 'Artífices del sabor que controlan el proceso de tostado para realzar las notas del grano.',
      image: '/images/carta3.gif',
      path: '/tostador'
    },
    {
      title: 'PRODUCTOR',
      description: 'Guardianes de la tierra que cultivan y cosechan los mejores granos con técnicas sostenibles.',
      image: '/images/carta1.gif',
      path: '/productor'
    },
    {
      title: 'EXPORTADOR',
      description: 'Especialistas en logística que conectan a los productores con los mercados internacionales.',
      image: '/images/carta4.gif',
      path: '/exportador'
    },
    {
      title: 'INVESTIGADOR',
      description: 'Innovadores que desarrollan nuevas variedades y mejoran las prácticas de cultivo del café.',
      image: '/images/carta5.gif',
      path: '/investigador'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="productor-section">
      <div className="container">
        <h2 className="section-title">LOS ARTESANOS DEL CAFÉ</h2>
        <p className="section-subtitle">
          Descubre los roles esenciales que transforman el grano en experiencia
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

export default Productor;