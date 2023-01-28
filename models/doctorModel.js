const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
const salon = new mongoose.Schema({
    fname : {
        type : String,
        require : true,
    },
    lname : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true

    },
    age : {
        type : Number,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    email: {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    address : {
        type : String
    },
    password : {
        type : String,
        require : true
    },
    department : {
        type : String,
        require : true
    },
    picture : {
        type : String,
    }, 
    lat:{
        type: mongoose.Schema.Types.Double,
    },
    lng:{
        type: mongoose.Schema.Types.Double,
    },
    price : {
        type : String,
    },
})

module.exports = mongoose.model("Salon", salon)