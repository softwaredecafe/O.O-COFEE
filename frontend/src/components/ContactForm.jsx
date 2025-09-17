import { useState } from 'react'

const ContactForm = ({ onRegistration }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'principiante',
    preferences: {
      arabica: false,
      robusta: false,
      lavado: false,
      natural: false
    },
    comments: '',
    paymentProof: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      let phoneValue = value.replace(/[^\d+]/g, '');
      
      if (!phoneValue.startsWith('+')) {
        if (phoneValue.startsWith('502')) {
          phoneValue = '+' + phoneValue;
        } else {
          phoneValue = '+502' + phoneValue;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      paymentProof: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!formData.name || !formData.email || !formData.phone || !formData.paymentProof) {
        alert('Por favor completa todos los campos obligatorios (*)');
        return;
      }

      if (!formData.phone.match(/^\+502[2-9]\d{7}$/)) {
        alert('El número de teléfono debe tener el formato +502xxxxxxxx');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('preferences', JSON.stringify(Object.keys(formData.preferences).filter(key => formData.preferences[key])));
      formDataToSend.append('comments', formData.comments);
      formDataToSend.append('paymentProof', formData.paymentProof);

      const response = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error en el registro');
      }

      onRegistration(formData);
      
      // Enviar mensaje al usuario registrado
      const userPhone = formData.phone.replace('+', '');
      const welcomeMessage = `¡Hola ${formData.name}! 🎉\n\nGracias por inscribirte a nuestra catación de café ☕\n\nDetalles de tu registro:\n- Email: ${formData.email}\n- Experiencia: ${formData.experience}\n\n¡Te esperamos! No olvides traer tu comprobante de pago.\n\nSaludos,\nCoffee Team 🌟`;
      
      const whatsappUrl = `https://wa.me/${userPhone}?text=${encodeURIComponent(welcomeMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: 'principiante',
        preferences: {
          arabica: false,
          robusta: false,
          lavado: false,
          natural: false
        },
        comments: '',
        paymentProof: null
      });
      
      alert('¡Inscripción exitosa! Te hemos enviado un mensaje de confirmación por WhatsApp.');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error en el registro. Por favor intenta nuevamente.');
    }
  }

  // ... resto del código del componente (el return con el formulario) permanece igual ...

  return (
    <section className="form-section" id="formulario">
      <div className="container">
        <div className="form-container transparent-form">
          <h2 className="form-title">Formulario de Inscripción</h2>
          <p className="form-subtitle">Completa tus datos para participar en la catación</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono * (formato: +502xxxxxxxx)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+502xxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label>Experiencia en catación</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="experience"
                    value="principiante"
                    checked={formData.experience === 'principiante'}
                    onChange={handleInputChange}
                  />
                  Principiante
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Preferencias de café</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="arabica"
                    checked={formData.preferences.arabica}
                    onChange={handleCheckboxChange}
                  />
                  Arábica
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="robusta"
                    checked={formData.preferences.robusta}
                    onChange={handleCheckboxChange}
                  />
                  Robusta
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lavado"
                    checked={formData.preferences.lavado}
                    onChange={handleCheckboxChange}
                  />
                  Lavado
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="natural"
                    checked={formData.preferences.natural}
                    onChange={handleCheckboxChange}
                  />
                  Natural
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comentarios o preguntas</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                placeholder="Escribe tus comentarios o preguntas aquí..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="paymentProof">Comprobante de pago *</label>
              <input
                type="file"
                id="paymentProof"
                name="paymentProof"
                onChange={handleFileChange}
                required
                accept="image/*"
              />
            </div>

            <button type="submit" className="btn-primary">
              Confirmar Inscripción
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm