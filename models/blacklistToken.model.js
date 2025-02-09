const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400, //24 hours in seconds
    }
});   

module.exports = mongoose.model('blacklistToken',blacklistTokenSchema);