const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    validate: {
      validator: function(v) {
        return /^\+502[2-9]\d{7}$/.test(v);
      },
      message: props => `${props.value} no es un número válido. Debe tener formato +502xxxxxxxx`
    }
  },
  experience: {
    type: String,
    required: [true, 'El nivel de experiencia es requerido'],
    enum: ['principiante', 'intermedio', 'avanzado']
  },
  preferences: {
    type: [String],
    required: [true, 'Las preferencias son requeridas']
  },
  comments: {
    type: String
  },
  paymentProof: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema);