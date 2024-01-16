const express = require("express")
const userSchema = require('../models/user')
const router = express.Router();

router.post("/user", (req, res) => {
  // res.send("Usuario creado")
  const data = req.body;
  const user = userSchema(data)
  user.save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => { console.log(error);res.json({mensaje:error}) })
})

router.get("/users", (req,res)=>{
  userSchema.find().then((data)=>{
    res.json(data)
  }).catch(error=>res.json({message:error}))
})

router.get("/user/:id",(req,res)=>{
  const {id}=req.params
  userSchema.findById(id).then(data=>{
    res.json(data)
  }).catch(error=>res.json({message:error}))
})


router.put("/user/:id",(req,res)=>{
  console.log()
  const {id} = req.params
  const {name,age,email}=req.body;
  userSchema.updateOne({_id:id},{$set:{name,age,email}}).then(data=>{
    res.json(data)
  }).catch(error=>{
    res.json({})
  }).catch(error=>res.json({message:error}))
})

router.delete("/user/:id",(req,res)=>{
  const {id} = req.params
  userSchema.deleteOne({_id:id}).then(data=>{
    res.json(data)
  }).catch(error=>res.json({message:error}))
})
module.exports = router;