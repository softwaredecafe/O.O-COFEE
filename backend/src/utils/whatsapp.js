// src/utils/whatsapp.js
exports.sendWhatsAppMessageToAdmin = (userData) => {
  try {
    // TU NÚMERO - reemplaza con tu número real (sin + y sin espacios)
    const adminNumber = "502TU_NUMERO_AQUI"; // Ejemplo: "50212345678"
    
    const message = `NUEVA INSCRIPCIÓN 🎉\n\nNombre: ${userData.name}\nTeléfono: ${userData.phone}\nEmail: ${userData.email}\nExperiencia: ${userData.experience}\nPreferencias: ${JSON.stringify(userData.preferences)}\nComentarios: ${userData.comments || 'Ninguno'}\n\n¡Gracias por inscribirte! Te esperamos.`;
    
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    
    console.log(`Mensaje de confirmación para admin: ${whatsappUrl}`);
    return { whatsappUrl, success: true };
  } catch (error) {
    console.error('Error generando mensaje para admin:', error);
    return { success: false, error: error.message };
  }
};