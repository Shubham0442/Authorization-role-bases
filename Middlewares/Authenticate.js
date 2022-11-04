
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authenticate = (req, res, next)=>{
      
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.KEY, function(err, decoded) {
        
        if(err){
            res.send({ "msg": "Please login agin"})
        }
        else{
            //console.log(decoded)
            req.body.userId = decoded.userId
            next()
        }
    });
}

module.exports = { Authenticate }