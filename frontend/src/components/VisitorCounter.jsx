import React, { useState, useEffect } from 'react';

const VisitorCounter = () => {
  const [visits, setVisits] = useState(null);
  const [loading, setLoading] = useState(true);

  // CAMBIA ESTO: Usa un nombre único para tu proyecto
  const NAMESPACE = 'cafe-antigua-navidad-prod-2025'; 
  const KEY = 'visitas';

  useEffect(() => {
    // CAMBIO DE API: Usamos 'counterapi.dev' porque la anterior cerró.
    // 'up' incrementa el contador automáticamente cada vez que se llama.
    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`)
      .then((res) => res.json())
      .then((data) => {
        // CAMBIO AQUÍ: Esta API devuelve 'count', la anterior devolvía 'value'
        setVisits(data.count); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener visitas:", err);
        // Valor por defecto si falla la red (puedes poner 0 si prefieres)
        setVisits(1024); 
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFD700' }} 
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <div style={styles.textContainer}>
        <span style={styles.label}>Visitas</span>
        <span style={styles.count}>
          {visits ? visits.toLocaleString() : '...'}
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'inline-flex', 
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    border: '1px solid rgba(255, 215, 0, 0.2)',
    borderRadius: '20px',
    fontFamily: "'Helvetica Neue', sans-serif",
    cursor: 'default',
    margin: '0 10px', 
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: '5px',
    lineHeight: '1',
  },
  label: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    color: '#aaa',
  },
  count: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#fff',
  }
};

export default VisitorCounter;