const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    fecha: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['reservado', 'disponible']
    }
});

const Dates = mongoose.model('Dates', dateSchema);

module.exports = Dates;
