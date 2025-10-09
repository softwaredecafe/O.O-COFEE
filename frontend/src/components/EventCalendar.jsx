import React, { useState, useEffect } from 'react';
import './EventCalendar.css';

// --- Iconos SVG para los botones de navegación ---
const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
// --- FIN DE LA CORRECCIÓN ---

function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // --- NUEVO ESTADO: para manejar la imagen seleccionada en la modal ---
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadMockEvents = () => {
      setLoading(true);
      const mockEvents = [
        {
          id: 1,
          title: 'Cata "TAZAS EN MONADAS 🐒"',
          date: '2025-10-15',
          imageUrl: '/images/mono.png'
        },
        {
          id: 2,
          title: 'Cata "SALE PANA"',
          date: '2025-10-31',
          imageUrl: '/images/catacion2.png'
        }
      ];
      
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
    };

    loadMockEvents();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // --- NUEVAS FUNCIONES: para abrir y cerrar la modal ---
  const handleEventClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
  
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="calendar-page-container">
      <h1 className="page-title">Tomate tu tiempo...</h1>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth} className="nav-button"><ArrowLeft /></button>
          <h2 className="calendar-title">{`${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`}</h2>
          <button onClick={handleNextMonth} className="nav-button"><ArrowRight /></button>
        </div>
        
        {loading ? (
          <div className="loading-state">Cargando eventos...</div>
        ) : (
          <div className="calendar-grid">
            {daysOfWeek.map(day => <div key={day} className="day-of-week">{day}</div>)}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => <div key={`empty-${index}`} className="calendar-day empty"></div>)}
            {Array.from({ length: daysInMonth }).map((_, day) => {
              const dayNumber = day + 1;
              const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
              const eventForDay = events.find(event => event.date === fullDate);
              
              return (
                
                <div 
                  key={dayNumber} 
                  className={`calendar-day ${eventForDay ? 'has-event' : ''}`}
                  onClick={() => eventForDay && handleEventClick(eventForDay.imageUrl)}
                >
                  <span className="day-number">{dayNumber}</span>
                  {eventForDay && (
                    <div className="event-marker">
                      <img src={eventForDay.imageUrl} alt={eventForDay.title} className="event-image" />
                      <span className="event-title">{eventForDay.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <img src={selectedImage} alt="Vista ampliada del evento" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCalendar;