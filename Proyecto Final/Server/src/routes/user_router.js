const express = require("express")
const router = express.Router();
const authenticationToken = require('../middleware/jwt')

const userController = require("../controllers/user_controller");



router.post("/user", userController.createUser)

router.get("/users", userController.getAllUser)

router.get("/user/:id", userController.getUserById)

router.put("/user/:id", userController.updateUser)

router.delete("/user/:id", userController.deleteUser)

module.exports = router;