const userSchema = require('../models/user_model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendEmail } = require('../services/emailService')
const { generarTokenRestablecimiento } = require('../services/authService')

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
  solicitudResetPass:async (req, res) => {
    try {
      const token = await generarTokenRestablecimiento(req.body.email)
      sendEmail(
        req.body.email,
        "restablecimiento de contraseña",
        "Cambiar contraseña .. " + token,  
      );
      res.send("se ha enviado un enlace de restablecimiento de contraseña")
    }
    catch (error) {
      res.status(500).send(error.message)
    }
  },
  resetPasswordToken:async (req, res) => {
    try {
      const user = await userSchema.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      })
      if (!user) {
        return res.status(400).send("Token de restablecimiento invalido o expirado")
      }
     // const hashedPassword = await bcrypt.hash(req.body.password, 12)
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save()
      res.send("Contraseña actualizada correctamente")
    } catch (error) {
      res.status(500).send("error al restablecer la contraseña", error.message)
    }
  }
};
module.exports = authController