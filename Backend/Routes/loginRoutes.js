//importar loginController y generar las rutas para el registro y el login
const loginController = require("../Controller/loginController");
const verifyToken = require("../middlewares/auth");
const router = require("express").Router();

//endpoint registro
router.post("/signup", loginController.signup);
//endpoint login
router.post("/login", loginController.login);
//endpoint para refrescar token
router.get("/refresh", verifyToken, loginController.refreshToken);

module.exports = router;
