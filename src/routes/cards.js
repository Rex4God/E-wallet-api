
const express = require("express");

const router = express.Router()

const {create,
    getAllCards,
    getCard,  
    updateCard,
    deleteCard,
    deleteAll}= require('../controllers/cards')

router.route('/').post(create).get(getAllCards).delete(deleteAll)

router.route('/:id').get(getCard).delete(deleteCard).put(updateCard)




module.exports=router






