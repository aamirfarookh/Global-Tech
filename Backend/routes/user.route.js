const express = require("express");
const {UserModel} = require("../models/user.model")
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()
// Register route
userRouter.post("/register", async(req,res)=>{
     const  {email,password,firstName,lastName,address,phoneNumber} = req.body;
     try {
        const user = await UserModel.findOne({email});
        if(!user){
          if(!email || !password || !firstName || !lastName || !address || !phoneNumber){
            res.status(400).send({msg:"Some details are missing",status:400})
          }
          else{
            bcrypt.hash(password,5, async(err,hash)=>{
                if(!err){
                    const newUser = new UserModel({email,password:hash,firstName,lastName,address,phoneNumber});
                    await newUser.save();
                    res.status(200).send({msg:"New user register success",status:200})
                }
                else{
                  res.status(400).send({msg:err.message})
                }
            })
          }
        }
        else{
            res.status(400).send({msg:"User already exists, please login",status:400})
        }
     } catch (error) {
        res.status(500).send({error:error.message})
     }
});

// Login route

userRouter.post("/login", async(req,res)=>{
    const {email,password,username} = req.body;
    try {
        const user = await UserModel.findOne({email:email});
        if(user){
          bcrypt.compare(password,user.password,async(err,result)=>{
             if(result){
                res.status(200).send({msg:"Login Success",token:jwt.sign({userID:user._id,role:user.role,username:user.firstName},process.env.key),status:200,username:user.firstName})
             }
             else{
              res.status(400).send({msg:"Wrong Credentials!",status:400})
             }
          })
        }
        else{
            res.status(404).send({msg:"No user found, please register",status:404})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})


module.exports ={userRouter}





// {
//     "email":"amir@gmail.com",
//     "password":"amir123",
//     "firstName":"Amir",
//     "lastName":"Bhat",
//     "address":{
//       "street":"Nowgam",
//       "city":"Srinagar",
//       "state":"JandK",
//       "zipCode":190015,
//       "country":"India"
//     },
//     "phoneNumber":"+91 8899990966"
//   }
