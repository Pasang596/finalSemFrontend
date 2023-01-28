const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('../auth/auth');
const upload = require('../fileUpload/fileUpload');

const jwt = require('jsonwebtoken');

const salon = require('../models/salonModel');
const salonAppointment = require("../models/salonAppointmentModel");
const admin = require("../models/adminModel")


router.post('/admin/register',(req,res)=>{
    const email = req.body.email;

    admin.findOne({email : email})
    .then((email_details)=>{
        if(email_details!=null){
            return res.json({msg:"Already Email"});
        }
        const password = req.body.password;
        const username = req.body.username;
        const phone = req.body.phone;
    
        


        bcryptjs.hash(password,10, (e,hashed_pw)=>{
            const data = new admin({
                email : email,
                password : hashed_pw,
                username : username,
                phone : phone,
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

router.post('/admin/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    admin.findOne({email : email})
    .then((admin_data)=>{
        if(admin_data == null){
            return res.json({msg : "Invalid Credentials"})
        }
        bcryptjs.compare(password,admin_data.password,(e,result)=>{
            if(result == false){
                return res.json({ msg : "Invalid Credentails"})
            } 
            // Now everything is valid 
            // Creates the token for logged in user
            // token stores logged in user's id
            const token = jwt.sign({aID : admin_data._id}, "B3AV3R69");
            res.json({token : token,msg : "Login Success"});
        })
    })
    .catch((e)=>{
        console.log(e)
    })

})



module.exports =router
