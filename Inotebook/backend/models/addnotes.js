const mongoose = require('mongoose');

const Schemanote = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creatusers', 
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const users = mongoose.model('addnote', Schemanote);

module.exports = users;