import React, { useState } from 'react';
import './FormularioPage.css';

const FormularioPage = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    experiencia: '',
    cafeteria: '',
    archivo: null
  });

  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivo') {
      setFormData(prev => ({
        ...prev,
        archivo: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      await enviarAGoogleAppsScript(formData);
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        resetForm();
      }, 5000);
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error al enviar el formulario: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  const enviarAGoogleAppsScript = async (data) => {

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwUDUn3MuZ_rQi9L2yLPnzV6mJYt4fXMYwCoqUvjgFRY9YVQlMPwTyI-sz2cUIHX0/exec';

    try {
      // Preparar los datos
      const payload = new URLSearchParams();
      payload.append('nombre', data.nombreCompleto);
      payload.append('experiencia', data.experiencia);
      payload.append('cafeteria', data.cafeteria || '');

      // Si hay archivo, convertirlo a base64
      if (data.archivo) {
        const base64File = await fileToBase64(data.archivo);
        payload.append('archivo', base64File);
        payload.append('nombreArchivo', data.archivo.name);
      }

      console.log('Enviando datos al script...', {
        nombre: data.nombreCompleto,
        experiencia: data.experiencia,
        archivo: data.archivo ? data.archivo.name : 'No hay archivo'
      });

      // Enviar con timeout para evitar bloqueos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const resultText = await response.text();
      console.log('Respuesta recibida:', resultText);

      let jsonResult;
      try {
        jsonResult = JSON.parse(resultText);
      } catch (parseError) {
        console.error('Error parseando JSON:', parseError);
        throw new Error('Respuesta no válida del servidor');
      }

      if (jsonResult.status !== 'success') {
        throw new Error(jsonResult.message || 'Error del servidor');
      }

      console.log(' Envío exitoso:', jsonResult);
      return jsonResult;

    } catch (error) {
      console.error('Error detallado en envío:', error);
      if (error.name === 'AbortError') {
        throw new Error('Tiempo de espera agotado. El servidor no respondió.');
      }
      throw new Error(`Error de conexión: ${error.message}`);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const resetForm = () => {
    setFormData({
      nombreCompleto: '',
      experiencia: '',
      cafeteria: '',
      archivo: null
    });
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="formulario-container">
      <div className="formulario-header">
        <h1>Formulario de Registro 0.0 COFFEE</h1>
        <p>Complete todos los campos para registrarse en nuestra sesión de catación</p>
      </div>

      {enviado && (
        <div className="mensaje-exito">
          ¡Registro completado! Comprobante guardado correctamente.
        </div>
      )}

      {cargando && (
        <div className="mensaje-cargando">
          Procesando comprobante, por favor espere...
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario-catacion">
        {/* Nombre Completo */}
        <div className="campo-grupo">
          <label htmlFor="nombreCompleto">NOMBRE COMPLETO *</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
            placeholder="Ingrese su nombre completo"
            disabled={cargando}
          />
        </div>

        {/* Experiencia en Catación */}
        <div className="campo-grupo">
          <label>EXPERIENCIA EN CATACIÓN *</label>
          <div className="opciones-experiencia">
            <label className="opcion-radio">
              <input
                type="radio"
                name="experiencia"
                value="PRINCIPIANTE"
                checked={formData.experiencia === 'PRINCIPIANTE'}
                onChange={handleChange}
                required
                disabled={cargando}
              />
              <span className="radio-custom"></span>
              PRINCIPIANTE
            </label>
            
            <label className="opcion-radio">
              <input
                type="radio"
                name="experiencia"
                value="MEDIO"
                checked={formData.experiencia === 'MEDIO'}
                onChange={handleChange}
                disabled={cargando}
              />
              <span className="radio-custom"></span>
              MEDIO
            </label>
            
            <label className="opcion-radio">
              <input
                type="radio"
                name="experiencia"
                value="PROFESIONAL"
                checked={formData.experiencia === 'PROFESIONAL'}
                onChange={handleChange}
                disabled={cargando}
              />
              <span className="radio-custom"></span>
              PROFESIONAL
            </label>
          </div>
        </div>

        {/* Cafetería */}
        <div className="campo-grupo">
          <label htmlFor="cafeteria">Numero de Telefono</label>
          <input
            type="text"
            id="cafeteria"
            name="cafeteria"
            value={formData.cafeteria}
            onChange={handleChange}
            placeholder="Ingresa tu numero de telefono"
            disabled={cargando}
          />
        </div>

        {/* Instrucciones de Pago */}
        <div className="instrucciones-pago">
          <h3>INSTRUCCIONES DE PAGO</h3>
          <div className="detalles-pago">
            <p>Realiza el pago de <strong>$50 USD</strong> por transferencia bancaria:</p>
            <div className="datos-bancarios">
              <div><strong>Banco:</strong> International Coffee Bank</div>
              <div><strong>Cuenta:</strong> 123-456789-001</div>
              <div><strong>Beneficiario:</strong> Catación Café Especial</div>
              <div><strong>SWIFT:</strong> ICBKUS33</div>
            </div>
            <p className="nota-pago">
              <strong>Suba el comprobante de transferencia aquí mismo:</strong>
            </p>
          </div>
        </div>

        {/* Subir Comprobante */}
        <div className="campo-grupo">
          <label htmlFor="archivo">SUBIR COMPROBANTE DE PAGO *</label>
          <div className="file-upload">
            <input
              type="file"
              id="archivo"
              name="archivo"
              onChange={handleChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
              disabled={cargando}
            />
            <div className="file-info">
              {formData.archivo ? (
                <span> Archivo seleccionado: {formData.archivo.name}</span>
              ) : (
                <span> Haga clic para seleccionar su comprobante</span>
              )}
            </div>
          </div>
          <small className="formato-archivos">
            Formatos aceptados: PDF, JPG, PNG (Máx. 10MB)
          </small>
        </div>

        {/* Botón de Envío */}
        <button 
          type="submit" 
          className="boton-enviar"
          disabled={cargando}
        >
          {cargando ? 'SUBIENDO ARCHIVO...' : 'ENVIAR REGISTRO Y COMPROBANTE'}
        </button>
      </form>

      <div className="informacion-contacto">
        <h4>¿Problemas con la subida?</h4>
        <p>Contáctenos a: instagram: 0.0 coffee | +502 4888 6580</p>
      </div>
    </div>
  );
};

export default FormularioPage;