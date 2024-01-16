const express = require("express")
const router = express.Router();
const authenticationToken = require('../middleware/jwt')

const authController = require("../controllers/auth_controller")

router.get('/recuperacion/:token',authController.recuperacionWeb );

router.post("/solicitudResetPass",authController.solicitudResetPass)

router.post('/resetPassword/:token', authController.resetPasswordToken)

router.get("/protected",authenticationToken, authController.checkProtected)

router.post('/register', authController.register)

router.post('/login', authController.login)

module.exports = router;