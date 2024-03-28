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
const deleteDate = async (req, res) => {
    try {
        const { fecha } = req.body;
        await Dates.findOneAndDelete(fecha);
        res.status(200).json({ message: 'Fecha eliminada exitosamente' });
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error al cliente
        console.error('Error al eliminar la fecha:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar la fecha' });
    }
}
const updateDate = async (req, res) => {
    try {
        const { fecha, fechaI } = req.body;

        // Actualiza la fecha en la base de datos
        const updatedDate = await Dates.findByIdAndUpdate(fechaId, { fecha }, { new: true });

        // Si la fecha se actualiza correctamente, envía una respuesta con la fecha actualizada
        res.status(200).json({ message: 'Fecha actualizada exitosamente', updatedDate });
    } catch (error) {
        // Si ocurre un error, envía una respuesta de error al cliente
        console.error('Error al actualizar la fecha:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar la fecha' });
    }
};



module.exports = { getReservedDates, reserveDate, deleteDate, updateDate };
