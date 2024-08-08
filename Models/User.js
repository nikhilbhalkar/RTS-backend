const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model("User",userschema);