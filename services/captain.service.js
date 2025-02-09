const captainModel = require('../models/captain.model');

exports.createCaptain = async ({
    firstname,lastname,email,password,
    color,plate,capacity,vehicletype,
}) => {
    if(!email || !password || !firstname  || !color || !plate || !capacity || !vehicletype){
        throw new Error('Please provide all required fields');
    }
    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicletype
        }
    });
    return captain;
}