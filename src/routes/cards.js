
const express = require("express");

const router = express.Router()

const { createCard,
    deleteCard,
    getAllCards,
    updateCard,
    getCard,}= require('../controllers/cards')

    router.route('/').post(createCard).get(getAllCards)

router.route('/:id').get(getCard).delete(deleteCard).patch(updateCard)




module.exports=router






