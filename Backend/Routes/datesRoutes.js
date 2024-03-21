const datesController = require("../Controller/datesController");
const router = require("express").Router();

//endpoint obtener citas disponibles
router.get('/availables', datesController.getDates);
//endpoint registrar una cita 
router.post('/reservation', datesController.postDates);

module.exports = router;
