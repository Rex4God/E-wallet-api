const express = require('express');
const router =express.Router()
const passport = require('passport');


router.get('/payment', passport.authenticate("jwt",{session:false}),(req, res)=>{
    res.send("You Have total: 2000$")
} )




module.exports=router