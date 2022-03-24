const mongoose=require('mongoose')
const express=require('express')
const User=require('../models/userModel')
const router=new express.Router()
const auth=require('../middleware/auth')

//create user(register)
router.post('/registerUser',async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()  
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send("email is incorrect or already registered")
    }
})

//user login
router.post('/loginUser',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send(token)
    }catch(e){
        res.status(400).send('Login Failed')
    }
})

//user logout
router.post('/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })                         
        await req.user.save()      
        res.send()                 
    }catch(e){
        res.status(500).send()    
    }
})  

//user logout from all devices
router.post('/logoutAll',auth,async (req,res)=>{
    try{
          req.user.tokens=[]         
          await req.user.save()      
          res.send()
    }catch(e){
          res.status(500).send()
    }
})


module.exports=router