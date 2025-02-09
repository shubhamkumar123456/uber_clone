const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { registerCaptain } = require('../controllers/captain.controller');


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1 characters long'),
    body('vehicle.vehicletype').isIn(['car','auto','motocycle']).withMessage('Vehicle type must be car, auto or motocycle'),
],registerCaptain);

// router.post('/login',[
//     body('email').isEmail().withMessage('Please enter a valid email'),
//     body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
// ],loginUser)



module.exports = router;