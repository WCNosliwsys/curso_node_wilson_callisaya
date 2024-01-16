const userSchema = require('../models/user_model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authController = {
  checkProtected: (req, res) => {
    res.status(200).json({ message: "Acceso permitido", username: req.username })
  },
  register: async (req, res) => {
    try {
      const newUser = userSchema(req.body)
      await newUser.save()
      res.status(201).send("Usuario registrado con Exito")
    } catch (error) {
      res.status(400).send(error)
    }
  },
  login: async (req, res) => {
    console.log("iniciando login")
    try {
      const user = await userSchema.findOne({ email: req.body.email })
      const isValidatedPassword = await bcrypt.compare(req.body.password, user.password)

      if (!user || !isValidatedPassword) {
        throw new Error("Credenciales invalidas")
      }
      console.log("credenciales correctas")
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      })
      res.status(200).send({ token })
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
};
module.exports = authController