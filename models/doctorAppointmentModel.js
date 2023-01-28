const mongoose = require('mongoose');

const salonAppointment = new mongoose.Schema({
    department : {
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
    },
    salonId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Salon"
    },
    status :{
        type : String,
        require : true
    },
    price :{
        type : String,
    }
})

module.exports = mongoose.model("SalonAppointment", salonAppointment)