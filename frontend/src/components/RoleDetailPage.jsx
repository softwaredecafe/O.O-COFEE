import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './RoleDetailPage.css';

const RoleDetailPage = () => {
  const { role } = useParams();

  const roleData = {
    barista: {
      title: 'BARISTA',
      description: 'Especialista en la preparación de café que domina las técnicas de extracción y el arte latte.',
      details: 'Los baristas son artistas que transforman granos de café en experiencias sensoriales únicas...',
      image: '/images/barista-detail.jpg'
    },
    catador: {
      title: 'CATADOR',
      description: 'Experto en análisis sensorial que evalúa la calidad y características del café.',
      details: 'Los catadores utilizan sus sentidos para detectar notas de sabor, aromas y defectos...',
      image: '/images/catador-detail.jpg'
    },
    tostador: {
      title: 'TOSTADOR',
      description: 'Maestro del proceso de tostado que define el perfil de sabor del café.',
      details: 'El tostador controla cuidadosamente el tiempo y temperatura para desarrollar...',
      image: '/images/tostador-detail.jpg'
    },
    productor: {
      title: 'PRODUCTOR',
      description: 'Agricultor especializado en el cultivo y cosecha de granos de café de calidad.',
      details: 'Los productores son los guardianes de la tierra que mantienen tradiciones centenarias...',
      image: '/images/productor-detail.jpg'
    }
  };

  const currentRole = roleData[role] || roleData.barista;

  return (
    <div className="role-detail-page">
      <div className="role-hero">
        <div className="hero-content">
          <h1>{currentRole.title}</h1>
          <p>{currentRole.description}</p>
          <Link to="/" className="back-button">← Volver al inicio</Link>
        </div>
      </div>
      
      <div className="role-content">
        <div className="container">
          <div className="role-info">
            <div className="role-text">
              <h2>El arte de ser {currentRole.title.toLowerCase()}</h2>
              <p>{currentRole.details}</p>
            </div>
            <div className="role-image">
              <img src={currentRole.image} alt={currentRole.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDetailPage;