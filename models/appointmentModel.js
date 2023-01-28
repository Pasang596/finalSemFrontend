const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    category : {
        type: String,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    time:{
        type: String,
        require : true
    },
    visitPurpose : {
        type: String,
    }, 
    appointmentFor : {
        type : String,
        require : true
    },
    fullname : {
        type : String,
        require : true
    },
    mobile : {
        type : String,
        require : true
    },
    email : {
        type : String
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patient'
    }
})

module.exports = mongoose.model("Appointment", appointment)