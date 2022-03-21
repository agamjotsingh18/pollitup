const mongoose=require('mongoose')
const express=require('express')
const User=require('../models/userModel')
const router=new express.Router()

//create user(register)
router.post('/registerUser',async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send("email is incorrect or already registered")
    }
})


//user login
router.post('/loginUser',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)
    }catch(e){
        res.status(400).send('Login Failed')
    }
})

module.exports=router