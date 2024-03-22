const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    fecha: {
        type: Date,
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
