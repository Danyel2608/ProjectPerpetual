const Dates = require("../Model/datesModel");
// Obtener todas las citas reservadas
const getReservedDates = async (req, res) => {
    try {
        const citasReservadas = await Dates.find({ estado: 'reservado' }).select('fecha');
        const fechasReservadas = citasReservadas.map(cita => cita.fecha);
        res.json(fechasReservadas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas reservadas' });
    }
};

// Reservar una cita
const reserveDate = async (req, res) => {
    try {
        const { fecha } = req.body;
        const date = await Dates.findOne({ fecha });
        if (!date) {
            const newDate = new Dates({
                fecha,
                estado: "reservado",
            });
            await newDate.save();
            res.status(201).json({
                status: "Succeeded",
                mensaje: 'Cita reservada exitosamente'
            });
        } else {
            res.status(409).json({ error: 'La cita ya está reservada' });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al reservar cita" });
    }
};

module.exports = { getReservedDates, reserveDate };
