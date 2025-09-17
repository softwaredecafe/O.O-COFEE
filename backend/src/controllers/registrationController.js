const Registration = require('../models/Registration');
const { sendWhatsAppMessageToAdmin } = require('../utils/whatsapp');

exports.createRegistration = async (req, res) => {
  try {
    const { name, email, phone, experience, preferences, comments } = req.body;
    const paymentProof = req.file ? req.file.filename : null;

    // Validación del formato del teléfono
    if (!phone.startsWith('+502')) {
      throw new Error('El número de teléfono debe comenzar con +502');
    }

    const registration = new Registration({
      name,
      email,
      phone,
      experience,
      preferences: JSON.parse(preferences),
      comments,
      paymentProof
    });

    await registration.save();

    const whatsappResult = sendWhatsAppMessageToAdmin({
      name,
      phone,
      email,
      experience,
      preferences: JSON.parse(preferences),
      comments
    });

    res.status(201).json({
      message: 'Registro exitoso. Te hemos enviado un mensaje de confirmación.',
      registration,
      whatsappUrl: whatsappResult.whatsappUrl,
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      success: false 
    });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};