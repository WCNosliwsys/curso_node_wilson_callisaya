const express = require("express")
const userSchema = require('../models/user_model')
const router = express.Router();
const authenticationToken = require('../middleware/jwt')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/protected", authenticationToken, (req, res) => {
  res.status(200).json({ message: "Acceso permitido", username: req.username })
})

router.post('/register', async (req, res) => {
  try {
    const newUser = userSchema(req.body)
    await newUser.save()
    res.status(201).send("Usuario registrado con Exito")
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login',
  async (req, res) => {
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
  })


router.post("/user", (req, res) => {
  // res.send("Usuario creado")
  const data = req.body;
  const user = userSchema(data)
  user.save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => { console.log(error); res.json({ mensaje: error }) })
})

router.get("/users", (req, res) => {
  userSchema.find().then((data) => {
    res.json(data)
  }).catch(error => res.json({ message: error }))
})

router.get("/user/:id", (req, res) => {
  const { id } = req.params
  userSchema.findById(id).then(data => {
    res.json(data)
  }).catch(error => res.json({ message: error }))
})


router.put("/user/:id", (req, res) => {
  console.log()
  const { id } = req.params
  const { name, age, email } = req.body;
  userSchema.updateOne({ _id: id }, { $set: { name, age, email } }).then(data => {
    res.json(data)
  }).catch(error => {
    res.json({})
  }).catch(error => res.json({ message: error }))
})

router.delete("/user/:id", (req, res) => {
  const { id } = req.params
  userSchema.deleteOne({ _id: id }).then(data => {
    res.json(data)
  }).catch(error => res.json({ message: error }))
})
module.exports = router;