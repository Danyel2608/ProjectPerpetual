const datesController = require("../Controller/datesController");
const { verifyToken } = require("../lib/util");
const router = require("express").Router();

//endpoint obtener citas reservadas
router.get('/availables', datesController.getReservedDates);
//endpoint registrar una cita 
router.post('/reservation', verifyToken, datesController.reserveDate);
//endpoint borrar una cita
router.delete('/delete', verifyToken, datesController.deleteDate);
//endpoit para actualizar una cita
router.put('/update', verifyToken, datesController.updateDate);

module.exports = router;
