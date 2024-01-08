const express = require("express")
const app= express();
const mongoose = require('mongoose')
require("dotenv").config()
const cors=require("cors")
const userRouter= require('./routes/user')
const port = process.env.PORT||3100
//midleware
app.use(express.json())
app.use('/api',userRouter)
app.use(cors())

app.get('/',(req,res)=>{
  res.send("Bienvenido a mi apirest")
})
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log("conexion a la bd exitosa")
})
.catch((error)=>{
  console.log(error)
})

app.listen(port, ()=>console.log('server escuchando en puerto', port))