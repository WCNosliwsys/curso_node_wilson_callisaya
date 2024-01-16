const express = require("express")
const router = express.Router();
const authenticationToken = require('../middleware/jwt')

const userController = require("../controllers/user_controller");



router.post("/user",authenticationToken, userController.createUser)

router.get("/users",authenticationToken, userController.getAllUser)

router.get("/user/:id",authenticationToken, userController.getUserById)

router.put("/user/:id",authenticationToken, userController.updateUser)

router.delete("/user/:id",authenticationToken, userController.deleteUser)

module.exports = router;