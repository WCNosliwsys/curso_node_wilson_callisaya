const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: String
  },
})
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    return next()
  }
  this.password = await bcrypt.hash(this.password,12)
  next()
})

module.exports = mongoose.model("User", userSchema)