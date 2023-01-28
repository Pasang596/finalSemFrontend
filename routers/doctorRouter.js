const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('../auth/auth');
const upload = require('../fileUpload/fileUpload');

const jwt = require('jsonwebtoken');

const salon = require('../models/salonModel');
const salonAppointment = require("../models/salonAppointmentModel");
// const { append } = require('express/lib/response');

// register for salon
router.post('/salon/register',auth.admin_guard, upload.single('doc_img'),(req,res)=>{
    const email = req.body.email;

    salon.findOne({email : email})
    .then((email_details)=>{
        if(email_details!=null){
            return res.json({msg:"Already Email"});
        }
        const fname = req.body.fname;
        const lname = req.body.lname;
        const password = req.body.password;
        const username = req.body.username;
        const address = req.body.address;
        const phone = req.body.phone;
        const age = req.body.age;
        const gender = req.body.gender;
        const department = req.body.department;
        const picture = req.file.filename;
        const lat = req.body.lat;
        const lng = req.body.lng;
        const price = req.body.price;
        


        bcryptjs.hash(password,10, (e,hashed_pw)=>{
            const data = new salon({
                fname : fname,
                lname :lname,
                email : email,
                password : hashed_pw,
                username : username,
                address : address,
                phone : phone,
                age : age,
                gender : gender,
                department : department,
                picture : picture,
                lat : lat,
                lng : lng,
                price : price,
            })
    
            data.save()
            .then(()=>{
                res.json({msg : "registered"})
            })
            .catch((e)=>{
                res.json({msg : "error"})
            })
        })
    })
    .catch(()=>{

    })
})


// Login for salon
router.post('/salon/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    salon.findOne({email : email})
    .then((salon_data)=>{
        if(salon_data == null){
            return res.json({msg : "Invalid Credentials"})
        }
        bcryptjs.compare(password,salon_data.password,(e,result)=>{
            if(result == false){
                return res.json({ msg : "Invalid Credentails"})
            } 
            // Now everything is valid 
            // Creates the token for logged in user
            // token stores logged in user's id
            const token = jwt.sign({dID : salon_data._id}, "B3AV3R69");
            res.json({token : token,msg : "Login Success"});
        })
    })
    .catch((e)=>{

    })

})


router.get("/salon/get/:doc_id", async (req,res)=>{
    const salon_details = await salon.findOne({_id : req.params.doc_id})
    if(!salon_details){
        res.json({msg : "Error in retrieving doc"})
    } else{
        res.json({data : salon_details})
    }
})


router.get('/salon/dashboard/single',auth.salon_guard ,(req,res)=>{
    res.json({
        id : req.salonINFO._id,
        fname : req.salonINFO.fname,
        lname : req.salonINFO.lname,
        gender : req.salonINFO.gender,
        age : req.salonINFO.age,
        email : req.salonINFO.email,
        username : req.salonINFO.username,
        phone: req.salonINFO.phone,
        address : req.salonINFO.address,
        department : req.salonINFO.department,
        picture : req.salonINFO.picture,
        lat : req.salonINFO.lat,
        lng : req.salonINFO.lng,
    })
})


router.get('/salon/dashboard/get/admin', async (req,res)=>{
    console.log("Errororororr")
    const salon_details = await salon.find({})
    res.json({
        details: salon_details
    })
})


router.get("/salon/category/:department", async(req,res)=>{
    const salon_details = await salon.find({department : req.params.department})
    res.json({
        details : salon_details
    })
})



// this is dashboard update route
router.put('/salon/update/get/:salon_id',auth.admin_guard, upload.single('doc_img'), (req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const id = req.params.salon_id;
    // const picture = req.file.filename;
    if(req.file == undefined){
        salon.updateOne({_id : id}, {fname :fname, lname: lname, username : username})
        .then(()=>{
            res.json({msg : "updated"})
        })
        .catch((e)=>{
            res.json({msg : "cannot update"})
        })
    } else{
        salon.updateOne({_id : id}, {fname :fname, lname: lname, username : username, picture : req.file.filename})
        .then(()=>{
            res.json({msg : "updated"})
        })
        .catch((e)=>{
            res.json({msg : "cannot update"})
        }) 
    }

    // salon.updateOne({_id : req.salonINFO._id}, {fname :fname, lname: lname, username : username})
    
})

/// view single docrtor

router.get("/salon/single/get/:salon_id",auth.admin_guard, (req,res)=>{
    salon.findOne({_id: req.params.salon_id})
    .then((data)=>{
        res.json({data: data})
    })
    .catch((e)=>{
        res.json({error: e})
    })
})


// this is for updating profile picture 

router.put('/salon/update_picture',auth.salon_guard,upload.single('doc_img'), (req,res)=>{
    if(req.file == undefined){
        return res.json({msg : "Invalid file format"})
    }
    
    // const picture = req.body.picture;
    salon.updateOne({_id : req.salonINFO._id}, {picture : req.file.filename })
    .then(()=>{
        res.send({msg : "img success"})
    })
    .catch((e)=>{
        res.send({msg : "failure"})
    })
    // console.log(req.file);
})

router.delete("/salon/delete/get/:salon_id",auth.admin_guard,(req,res)=>{
    const salon_id = req.params.salon_id;
    salon.deleteOne({_id : salon_id })
    .then(()=>{
        res.send({msg: "Salon Deleted", success: true})
    })
    .catch((e)=>{
        res.send({msg: "Salon not deleted"})
    })
})


// router for getting appointment
router.get("/salon/getAppointment/:status", auth.salon_guard, async(req,res)=>{
    const appointmentDetails = await salonAppointment.find({salonId : req.salonINFO._id, status : req.params.status}).populate("patientId")
    if(!appointmentDetails){
        res.json({success : false,msg : "Appointment Not Found"})
    } else{
        res.json({success : true, data : appointmentDetails})
    }
})

//  for changing the status of the appointment 
router.put("/salon/updateAppointmentStatus/:appointmentId", async(req,res)=>{
    
    salonAppointment.updateOne(
            {_id : req.params.appointmentId},
            {
                status : req.body.appointmentStatus
            }
        )
        .then(()=>{
            res.json({msg : "Updated Status"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot Update"})
            console.log(e)
        })
})


module.exports =router