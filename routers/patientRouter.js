const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const patient = require("../models/patientModel");
const salon = require('../models/salonModel');
const jwt = require('jsonwebtoken');
const patient_auth = require('../auth/auth');
const upload = require('../fileUpload/fileUpload');



router.post("/patient/insert", (req,res) =>{
    const email = req.body.email;

    patient.findOne({email : email})
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
        // const picture = req.body.picture;


        bcryptjs.hash(password,10, (e,hashed_pw)=>{
            const data = new patient({
                fname : fname,
                lname :lname,
                email : email,
                password : hashed_pw,
                username : username,
                address : null,
                phone : phone,
                age : age,
                gender : gender,
                picture : null,
            })
    
            data.save()
            .then(()=>{
                res.json({msg : "Register Success", statusText : true})
            })
            .catch((e)=>{
                res.json({msg : "error", statusText : false})
            })
        })
    })
    .catch(()=>{

    })
})


// Login for patient
router.post('/patient/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    patient.findOne({email : email})
    .then((patient_data)=>{
        if(patient_data == null){
            console.log("dvsc");
            return res.json({msg : "Invalid Credentials"})
        }
        bcryptjs.compare(password,patient_data.password,(e,result)=>{
            if(result == false){
                return res.json({ msg : "Invalid Credentails"})
            } 
            // Now everything is valid 
            // Creates the token for logged in user
            // token stores logged in user's id
            const token = jwt.sign({pID : patient_data._id}, "B3AV3R69");
            res.json({token : token, msg : "Login Success"});
        })
    })
    .catch((e)=>{

    })

})

// for getting single patient 

router.get("/patient/:pat_id", async (req,res)=>{
    const patient_details = await patient.findOne({_id : req.params.pat_id})
    if(!patient_details){
        res.json({msg : "Error in retrieving patient"})
    } else{
        res.json({data : patient_details})
    }
})



// // this is for testing only
// router.delete('/patient/comment',patient_auth.patient_guard, (req,res)=>{
//     res.json({msg : "deleted"});
// });


// this is dashboard route for patient 
router.get('/patient/dashboard/get',patient_auth.patient_guard, (req,res)=>{
    // console.log(req);
    res.status(201).json({
        id : req.patientINFO._id,
        fname : req.patientINFO.fname,
        lname : req.patientINFO.lname,
        email : req.patientINFO.email,
        username : req.patientINFO.username,
        age: req.patientINFO.age,
        gender : req.patientINFO.gender,
        phone : req.patientINFO.phone,
        address : req.patientINFO.address,
        password : req.patientINFO.password,
        picture : req.patientINFO.picture,
    })
})


router.put('/patient/update/get', patient_auth.patient_guard, upload.single('pat_img'), (req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const gender = req.body.gender;
    const age = req.body.age;
    const username = req.body.username;
    const phone = req.body.phone;
    const address = req.body.address;
    console.log("Fname" + fname)
    console.log("lname" +lname)
    console.log("gender" +gender)
    console.log("age" +age)
    console.log("username" +username)
    console.log("phone" +phone)
    console.log("address" +address)
    
    // const picture = req.file.filename;
    if(req.file == undefined){
        patient.updateOne(
            {_id : req.patientINFO._id},
            {
                fname :fname,
                lname: lname, 
                gender :gender,
                age:age, 
                username : username,
                phone : phone,
                address : address
            }
        )
        .then(()=>{
            res.json({msg : "updated"})
        })
        .catch((e)=>{
            res.json({msg : "cannot update"})
        })
    } else{
        patient.updateOne(
            {_id : req.patientINFO._id}, 
            {
                fname :fname,
                lname: lname, 
                gender :gender,
                age:age, 
                username : username,
                phone : phone,
                address : address,
                picture : req.file.filename
            }
        )
        .then(()=>{
            res.json({msg : "updated img"})
        })
        .catch((e)=>{
            res.json({msg : "cannot update img"})
        }) 
    }

    
})





module.exports = router;