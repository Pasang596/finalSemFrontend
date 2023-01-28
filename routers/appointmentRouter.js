const express = require('express');
const router = new express.Router();
const appointment = require("../models/appointmentModel");
const salonAppointment = require("../models/salonAppointmentModel");
const auth = require("../auth/auth");
const upload = require("../fileUpload/fileUpload")



// route to book appointment


// ########################################## for booking salon appointment $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

router.post("/patient/bookSalonAppointment/get", auth.patient_guard, async (req,res)=>{
    const date = req.body.date;
    const time = req.body.time;
    const salonId = req.body.salonId;
    const patientId = req.patientINFO._id;
    const department = req.body.department;
    const fullname = req.body.fullname;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const price = req.body.price;
    const salonAppointmentDetails = await salonAppointment.findOne({patientId : patientId, salonId : salonId, date : date, time : time})
    if(salonAppointmentDetails == null){
        const data = new salonAppointment({
            date : date,
            time : time,
            salonId : salonId,
            patientId : patientId,
            department : department,
            fullname : fullname,
            mobile : mobile,
            email : email,
            price : price,
            status : "Bidding"
        })

        data.save()
        .then(()=>{
            res.json({msg : "Salon Appointment Booked"})
        })
        .catch((e)=>{
            res.json({msg : "Salon Booking failed"})
        })
    } else{
        res.json({msg : "Already Appointment"})
    }
})

 
router.get("/patient/getBookedSalonAppointment/get", auth.patient_guard, async(req,res)=>{
    const salonBookedAppointment = await salonAppointment.find({patientId : req.patientINFO._id}).populate("salonId")
    if(!salonBookedAppointment){
        res.status(500).json({success : false, msg : "Error no booked appointment"})
    } else{
        res.status(200).json({success: true , data : salonBookedAppointment})
    }
})

router.put("/patient/updateBookedSalonAppointment/get/:appointmentId", async(req,res)=>{
    
    const fullname = req.body.fullname;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const date = req.body.date;
    const time = req.body.time;
    const status = req.body.status;
    const price = req.body.price;

    salonAppointment.updateOne(
            {_id : req.params.appointmentId},
            {
                price : price,
                status : status,
            }
        )
        .then(()=>{
            res.json({msg : "Updated"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot Update"})
        })
})

router.delete("/patient/deleteBookedSalonAppointment/get/:appointmentId", auth.patient_guard,(req,res)=>{
    console.log(req.params.appointmentId)
    salonAppointment.deleteOne({_id : req.params.appointmentId })
    .then(()=>{
        res.send({msg: "Salon Appointment Deleted", success: true})
    })
    .catch((e)=>{
        res.send({msg: "Cannot Delete Salon Appointment",success: false})
    })
})


module.exports = router;