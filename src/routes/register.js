const express = require("express");
const User = require("../models/user");
const {StatusCodes} =require('http-status-codes')

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName,lastName, email, phone, password, image} = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(StatusCodes.CONFLICT).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ firstName,lastName, email, phone, password ,image});
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) 
  res.status(StatusCodes.CREATED).json({ savedUser });
});

module.exports = router;
