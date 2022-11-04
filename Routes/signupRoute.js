

const { Router } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");

const signUpRouter = Router();


signUpRouter.post("/", async( req, res )=>{

    const { email, password } = req.body;
    
    bcrypt.hash(password, 6, async function(err, hash) {
         
        if(err){
            res.send({ "msg": "Something went wrong..."})
        }
        else
        { 
            if(req.body.role){
                const newUser = new User({
                    email: email,
                    password: hash,
                    role: req.body.role
                 });
    
                //console.log(newUser)
                await newUser.save();
                res.send({ "msg": "signup successful"})
            }
            else{
                
                const newUser = new User({
                    email: email,
                    password: hash
                 });
    
                //console.log(newUser)
                await newUser.save();
                res.send({ "msg": "signup successful"})
            }  
        }
    });

}); 

signUpRouter.get("/read", async(req, res)=>{
    const users = await User.find();
    res.send(users)
})

module.exports = { signUpRouter }