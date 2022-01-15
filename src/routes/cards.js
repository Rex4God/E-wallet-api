
const express = require("express");

const router = express.Router()


const cardController = require('../controllers/cards')

router.route('/')
.post(cardController.create)
.get(cardController.getAllCards)
.delete(cardController.deleteAll)

router.route('/:id')
.get(cardController.getCard)
.delete(cardController.deleteCard)
.put(cardController.updateCard)

router.route('/card-type')
.get(cardController.cardType)

module.exports=router






