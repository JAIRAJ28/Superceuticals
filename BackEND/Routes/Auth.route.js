const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { usermodel } = require("../Model/Auth_user.Model");
const signin = express.Router();
signin.post('/signup', async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const pass = req.body.password;
    const name = req.body.name;
    try {
      const existingUser = await usermodel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "User already registered with this email" });
      }
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (hash) {
          const newUser = new usermodel({ email, password: hash, name });
          await newUser.save();
          return res.status(200).send({ message: "New user has been registered" });
        } else {
          return res.status(500).send({ message: "Failed to register new user" });
        }
      });
    } catch (error) {
      return res.status(404).send({ message: error.message,error_occured:"Signup ROUTE" });
    }
  });
signin.post('/login',async (req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  const data=await usermodel.findOne({email})
  if(data){
    try {
        bcrypt.compare(password,data.password,function (err, result){
            if(result){
                let token=jwt.sign({id:data._id,name:data.name},'superneutic')
                res.status(200).send({ msg: "Logged in Token passed Successfully", token: token });
            }
        })

    } catch (error) {
        res.status(400).send({message:error.message,error_occured:"/login catch"})
    }
  }else{
    res.status(400).send({message:error.message,error_occured:"LOGIN ROUTE"})
  }
})
module.exports = {
    signin,
};
