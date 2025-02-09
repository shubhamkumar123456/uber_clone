const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

exports.registerCaptain = async (req, res) => {
  // res.status(200).json(req.user);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } =
    req.body;
  const { firstname, lastname } = fullname;
  const { color, plate, capacity, vehicletype } = vehicle;

  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  try {
    const captain = await captainService.createCaptain({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      color,
      plate,
      capacity,
      vehicletype,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain,token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
