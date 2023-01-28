const mongoose = require("mongoose");

const staff = new mongoose.Schema({
    fullName : {
        type: String,
    },
    address : {
        type : String,
    },
    phone :{
        type : String,
    },
    gender : {
        type : String,
    },
    age : {
        type: String,
    },
    email : {
        type: String,
    },
    password : {
        type : String,
    }
})


module.exports = mongoose.model("Staff", staff);