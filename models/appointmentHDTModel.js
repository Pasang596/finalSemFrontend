const mongoose = require("mongoose");

const appointmentHDT = new mongoose.Schema({
    nailsCategoryID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'NailsCategory',
    },
    date :{
        type: String,
        require : true,
    },
    time:{
        type: Array,
        require : true,
    }
})

module.exports = mongoose.model("AppointmentHDT", appointmentHDT)