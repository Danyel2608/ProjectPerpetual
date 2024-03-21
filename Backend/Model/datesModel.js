const mongoose = require("mongoose");

const datesSchema = new mongoose.Schema({
  fecha: {
    type: String, // Guardaremos la fecha como una cadena
    unique: true,
    required: true,
    validate: {
      validator: function(value) {
        // Expresión regular para verificar el formato dd/mm/yyyy
        return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
      },
      message: props => `${props.value} no tiene el formato dd/mm/yyyy!`
    }
  },
  estado: {
    type: String,
    enum: ['disponible', 'reservado'],
    default: 'disponible',
    required: false,
  }
});

const Dates = mongoose.model("Dates", datesSchema);

module.exports = Dates;
