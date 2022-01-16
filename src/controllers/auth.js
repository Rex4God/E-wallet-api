const User = require("../models/User");
const {StatusCodes} =require('http-status-codes')
const jwt = require("jsonwebtoken");

const register =async (req, res) => {
    const { 
      firstName,
      lastName, 
      email, 
      phone,
      password} = req.body;
  
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  
    if (alreadyExistsUser) {
      return res.status(StatusCodes.CONFLICT).json({ message: "User with email already exists!" });
    }
  
    const newUser = new User({ firstName,lastName, email, phone, password });
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Cannot register user at the moment!" });
    });
  
    if (savedUser) 
    res.status(StatusCodes.CREATED).json({ savedUser, message:'User created Successfully' });
  };

  const login =async (req, res) => {
    const { email, password } = req.body;
  
    const userWithEmail = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
    if (!userWithEmail)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email or password does not match!" });
  
    if (userWithEmail.password !== password)
      return res.status(StatusCodes.NOT_FOUND) .json({ message: "Email or password does not match!" });
    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      process.env.JWT_SECRET,{expiresIn:process.env.LIFE_TIME}
    );
  
    res.json({ message: "Welcome Back!", token: jwtToken });
  };
  


  module.exports={ register,  login}
  