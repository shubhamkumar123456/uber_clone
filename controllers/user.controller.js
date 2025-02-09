const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

exports.registerUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password} = req.body;
    const {firstname,lastname} = fullname;
    const hashedPassword = await userModel.hashPassword(password);
    try{
        const user = await userService.createUser({firstname,lastname,email,password:hashedPassword});
        const token = user.generateAuthToken();
        res.status(201).json({user,token});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.loginUser = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:'Invalid email or password'});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'});
        }
        const token = user.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({user,token});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.getUserProfile = async(req,res,next)=>{
  res.status(200).json(req.user);
}

exports.logoutUser = async(req,res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message:'Logged out successfully'});
}






