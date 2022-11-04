
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum:[ "consumer", "seller", "admin"], default: "consumer", required: true }
});

const User = mongoose.model( "user", userSchema );

module.exports = { User }