
const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    username : {
        type : String,
    },
    email: {
        type : String,
    },
    phone : {
        type : String,

    },
    password : {
        type : String,
    },
})


module.exports = mongoose.model('admin', admin);