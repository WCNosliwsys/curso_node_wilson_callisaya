
const userSchema = require('../models/user_model')
const userController = {
  getAllUser: (req, res) => {
    console.log("obteniendo todos los usuarios del controller")
    userSchema.find().then((data) => {
      res.json(data)
    }).catch(error => res.json({ message: error }))
  },
  getUserById: (req, res) => {
    const { id } = req.params
    userSchema.findById(id).then(data => {
      res.json(data)
    }).catch(error => res.json({ message: error }))
  },
  createUser: (req, res) => {
    // res.send("Usuario creado")
    const data = req.body;
    const user = userSchema(data)
    user.save()
      .then((data) => {
        res.json(data)
      })
      .catch((error) => { console.log(error); res.json({ mensaje: error }) })
  },
  updateUser: (req, res) => {
    console.log()
    const { id } = req.params
    const { name, age, email } = req.body;
    userSchema.updateOne({ _id: id }, { $set: { name, age, email } }).then(data => {
      res.json(data)
    }).catch(error => {
      res.json({})
    }).catch(error => res.json({ message: error }))
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    userSchema.deleteOne({ _id: id }).then(data => {
      res.json(data)
    }).catch(error => res.json({ message: error }))
  },

};
module.exports = userController