const multer = require('multer');
const { findOneAndReplace } = require('../models/patientModel');


const storage  = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './userImages')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})

const filter = (req, file, cb)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null, false)
        // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        // return res.json({msg : "images are allowed"})
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
})

module.exports = upload;