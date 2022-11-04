
const express = require("express");
const { connect } = require("./Config/db");
const { loginRouter } = require("./Routes/loginRoute");
const { productRouter } = require("./Routes/productsRoute");
const { signUpRouter } = require("./Routes/signupRoute");
require("dotenv").config();

const Port = process.env.PORT || 5238 


const app = express();
app.use(express.json());

app.use("/signup", signUpRouter)
app.use("/login", loginRouter)
app.use("/product", productRouter)

app.listen( Port , async ()=>{
    try{
        await connect 
        console.log(`server in running http://localhost:${Port}`)
    }
    catch(error){
        console.log(error)
    }
})