const express = require('express');
const router = express.Router();
const Dates = require("../Model/datesModel");

// Endpoint para obtener todas las citas reservadas
const getDates = async (req, res) => {
    try {
        const citasReservadas = await Dates.find({ estado: 'reservado' });
        res.json(citasReservadas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas disponibles' });
    }
};

// Endpoint para reservar una cita
const postDates = async (req, res) => {
    try {
        const { fecha } = req.body;
        const date = await Dates.findOne({ fecha });
        if (!date) {
            const newDate = new Dates({
                fecha,
                estado: "reservado",
            })
            await newDate.save();
            res.status(201).json({
                status: "Succeeded",
                mensaje: 'Cita reservada exitosamente'
            });
        }
        return res.status(404).json({ error: 'Cita no disponible' });
    } catch (error) {
        res.status(500).json({ error: "Error al reservar cita" });
    }
};

module.exports = { getDates, postDates };
