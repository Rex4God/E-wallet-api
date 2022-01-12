const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')

const router = express.Router();

router.post("/login", async (req, res) => {
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
});

module.exports = router;
