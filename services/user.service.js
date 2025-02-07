const userModel = require('../models/user.model');
exports.createUser = async({firstname,lastname,email,password})=>{
    if(!firstname ||!email || !password){
        throw new Error('Please provide all the required fields');
    }
    const user = new userModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
    return await user.save();
}