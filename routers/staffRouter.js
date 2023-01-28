const express = require('express');
const router = new express.Router();
const auth = require("../auth/auth")
const staff = require("../models/staffModel")
const bcryptjs = require("bcryptjs");
const nailsCategory = require("../models/nailsCategoryModel");
const appointmentHDT = require("../models/appointmentHDTModel");
const nailsCategoryModel = require('../models/nailsCategoryModel');


// register staff
router.post("/staff/register",(req,res)=>{
    const email = req.body.email;
    staff.findOne({email : email})
    .then((email_details)=>{
        if(email_details != null){
            return res.json({"msg": "Email Already"});
        }
        const fullName = req.body.fullName;
        const address = req.body.address;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const age = req.body.age;
        const email = req.body.email;
        
        // bcryptjs.hash(password, 10, (e,hashed_pw)=>{
        //     const data = new 
        // })

    })
    .catch((e)=>{})
})
// router for adding nails category
// the guard should have been of staff but is right now a customer
router.post("/staff/nailsCategory",auth.admin_guard, (req,res)=>{
    const name = req.body.name
    nailsCategory.findOne({name: name})
    .then((nailsCategoryDetails)=>{
        if(nailsCategoryDetails != null){
            return res.json({msg : "Already category"})
        }
        const data = new nailsCategory({
            name: name,
        })

        data.save()
        .then(()=>{
            res.json({msg : "Added Category"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot add Category"})
        })
    })
    .catch((e)=>{
        res.json({msg: "Error"})
        console.log(e)
    })

})

router.delete("/staff/nailsCategory/delete/:hc_id", auth.admin_guard, (req,res)=>{
    nailsCategory.deleteOne({_id : req.params.hc_id})
    .then(()=>{
        res.json({msg : "Delete Success"})
    })
    .catch((e)=>{
        console.log(e)
    })
})


router.get("/staff/nailsCategory", async (req,res)=>{
    const nailsCategoryList = await nailsCategory.find({})
    if(!nailsCategoryList){
        res.status(500).json({
            success : false,
            
        })
    } else{
        res.status(201).json({
            success: true,
            data: nailsCategoryList,
        })
    }
})

// router for appointment date and time for a particular category 
router.post("/staff/appointment/dateAndtime",auth.admin_guard, async(req,res)=>{
    const date = req.body.date;
    const time = req.body.time;
    const nailsCategoryID = req.body.nailsCategoryID;
    // console.log(nailsCategoryID)
    appointmentHDT.findOne({nailsCategoryID: nailsCategoryID, date : date})
    .then((appointmentHDTDetails)=>{
        if(appointmentHDTDetails != null){
            console.log(appointmentHDTDetails)
            return res.json({msg: "Already DateAndTime"})
        }
        const data = new appointmentHDT({
            nailsCategoryID : nailsCategoryID,
            date: date,
            time : time,
        })

        data.save()
        .then(()=>{
            res.json({msg : "Added DateAndTime"})
        })
        .catch((e)=>{
            res.json({msg : "Cannot Add DateAndTime"})
            
        })
    })
    .catch((e)=>{
        res.json({msg : "Error"})
        console.log(e)
    })
})

router.get("/staff/appointment/dateAndtime/:nailsCategoryID", async (req,res)=>{
    const nailsCategoryID = req.params.nailsCategoryID;
    const appointmentHDTList = await appointmentHDT.find({nailsCategoryID: nailsCategoryID})
    console.log(appointmentHDTList)
    if(!appointmentHDTList){
        res.status(500).json({
            success : false,
        })
    } else{
        res.status(201).json({
            success: true,
            data: appointmentHDTList,
        })
    }
})

router.delete("/staff/appointment/date/:nailsCategoryID/:date", async (req,res)=>{
    const nailsCategoryID = req.params.nailsCategoryID;
    const date = req.params.date;
    const appointmentHDTList = await appointmentHDT.findOne({nailsCategoryID: nailsCategoryID,date : date})
    console.log(appointmentHDTList)
    appointmentHDT.deleteOne({_id : appointmentHDTList._id})
    .then(()=>{
        res.json({msg : "Deleted Date"})
    })
    .catch((e)=>{
        res.json({msg : "Cannot Delete"})
    })
})

router.put("/staff/appointment/time/delete", async(req,res)=>{
    const nailsCategoryID = req.body.nailsCategoryID;
    const date = req.body.date;
    const time = req.body.time;
    appointmentHDT.updateOne(
            {nailsCategoryID : nailsCategoryID,date : date},
            {$pull:{"time" : time}}
        )
    .then(()=>{
        res.send({msg:"time deleted"})
    })
    .catch((e)=>{
        res.send({msg:"time couldnot be deleted"})
        console.log(e);

    })
})

router.get("/staff/get/nailsCategoryId/:name", async(req,res)=>{
    const name = req.params.name;
    const nailsCategoryDetails = await nailsCategory.findOne({name : name})
    console.log(nailsCategoryDetails.data)
    if(!nailsCategoryDetails){
        res.json({success : false})
    } else{
        res.json({
            success : true,
            data : nailsCategoryDetails
        })
    }
})

router.put("/staff/appointment/time/add/:nailsCategoryID", async(req,res)=>{
    const nailsCategoryID = req.params.nailsCategoryID;
    const date = req.body.date;
    const time = req.body.time;
    console.log(nailsCategoryID);
    console.log(date);
    console.log(time);

    appointmentHDT.findOne({nailsCategoryID : nailsCategoryID,date : date,time: time})
    .then((appointment_HDT)=>{
        if(appointment_HDT == null){
            appointmentHDT.updateOne(
                    {nailsCategoryID : nailsCategoryID,date : date},
                    {$push:{"time" : time}}
                )
            .then(()=>{
                res.json({success:true ,msg:"time added"})
            })
            .catch((e)=>{
                res.json({msg:"time couldnot be added"})
                console.log("Error");
                console.log(e);
    
            })
        } else{
            res.json({success: false,msg:"already same time on same date and category"})
        }
    })
    .catch((e)=>{
        res.json({success: false,msg:"couldnot find data"})

    })
    
})

module.exports = router;


