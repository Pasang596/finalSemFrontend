const mongoose = require("mongoose");

const nailsCategory = new mongoose.Schema({
    name:{
        type: String,
        require: true
    }
})


module.exports = mongoose.model('NailsCategory', nailsCategory)