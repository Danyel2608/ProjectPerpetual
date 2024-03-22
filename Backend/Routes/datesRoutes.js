const datesController = require("../Controller/datesController");
const router = require("express").Router();

//endpoint obtener citas disponibles
router.get('/availables', datesController.getReservedDates);
//endpoint registrar una cita 
router.post('/reservation', datesController.reserveDate);

module.exports = router;
