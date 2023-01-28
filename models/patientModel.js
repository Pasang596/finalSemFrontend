
const mongoose = require('mongoose')

const patient = new mongoose.Schema({
    fname : {
        type : String,

    },
    lname : {
        type : String,

    },
    gender : {
        type : String,

    },
    age : {
        type : String,
    },
    username : {
        type : String,
    },
    email: {
        type : String,
    },
    phone : {
        type : String,

    },
    address : {
        type : String
    },
    password : {
        type : String,
    },
    picture : {
        type: String,
    }
    
})


module.exports = mongoose.model('Patient', patient);