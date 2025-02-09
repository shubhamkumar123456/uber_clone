const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'minlength should be greater than 3'],
        },
        lastname: {
            type: String,
            minlength: [3, 'minlength should be greater than 3'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'minlength should be greater than 3'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'min should be greater than 1'],
        },
        vehicletype: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'motocycle'],
        },
    },
    location: {
        lat: {
            type: Number,

        },
        lng: {
            type: Number,

        }
    }
})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('captain',captainSchema);