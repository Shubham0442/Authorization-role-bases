
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const loginRouter = Router();


loginRouter.post("/", async( req, res )=>{

    const { email, password } = req.body;
    const currentUser = await User.findOne({ email })
    
    bcrypt.compare(password, currentUser.password, function(err, result) {
        
         if(result){
             
            const token = jwt.sign({ email: email, userId : currentUser._id }, process.env.KEY);
            res.send({ "msg": "Login successful", token: token})
         }
         else{
             
            res.send({ "msg": "Please check cridentials"})
         }
    });

});

module.exports = { loginRouter }