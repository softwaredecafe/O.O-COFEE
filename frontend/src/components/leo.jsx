import React from 'react';
import './leo.css'; 

function leo() {
  return (
    <div className="split-screen-container">
      {/* --- LADO IZQUIERDO: IMAGEN A PANTALLA COMPLETA --- */}
      <div className="image-pane">
        <img 
          src="/images/baristas/leo.png" 
          alt="Barista Leo, experto en café" 
          className="full-height-image"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1000x1200/1a1a1a/FFFFFF?text=Imagen+de+Leo'; }}
        />
      </div>

      {/* --- LADO DERECHO: CONTENIDO E INFORMACIÓN --- */}
      <div className="content-pane">
        <div className="content-wrapper">
          <h1 className="leo-title">Kevin de León</h1>
          <h2 className="leo-subtitle">Café filtrado/ Coffee minds</h2>
          <p className="leo-text">
            Hola, soy Kevin “Leo” de León, barista y tostador con más de 10 años de experiencia. 
            Fundador de Coffee Minds, donde comparto una selección de cafés únicos que rompen con lo 
            tradicional. Apasionado por cada taza, galardonado en métodos, espresso y arte latte.
          </p>
          <p className="leo-text">
            Mi viaje me ha llevado de los diseños en latte art hasta los podios del Brewing: 
            Juez COE 2022 ⭐, 3er lugar nacional 2024 ⭐ y 1er lugar nacional 2025 ⭐.
            Hoy mi meta es simple: que cada taza cuente una historia y despierte emociones
          </p>

          {/* --- SECCIÓN DE ENLACES MODIFICADA --- */}
          <div className="social-links">
            {/* Primer enlace a Instagram. El atributo "title" crea el texto emergente. */}
            <a href="https://www.instagram.com/_leomotorizado?igsh=MThnMngwbGF4ZTNn" target="_blank" rel="noopener noreferrer" title="Personal" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Segundo enlace a Instagram */}
            <a href="https://www.instagram.com/coffeemindsgt?igsh=MXN6dm1sdm9saHU5Mw==" target="_blank" rel="noopener noreferrer" title="Coffee Minds" className="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
             {/* Tercer enlace a Instagram */}
            <a href="https://www.instagram.com/cafe.filtrado?igsh=ZzV1ZDZyZmJkb2V5" target="_blank" rel="noopener noreferrer" title="Proyectos" className="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// CORRECCIÓN: Exportar el componente con mayúscula
export default leo;