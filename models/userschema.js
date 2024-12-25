const mongoose = require("mongoose");


const userSchema =  new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    isVerified:Boolean,
    

})

const user = mongoose.model("user",userSchema);

module.exports = user;