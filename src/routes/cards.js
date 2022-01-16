
const express = require("express");

const router = express.Router()

const cardController = require('../controllers/cards')

router.route('/')
  .post(cardController.create)
  .get(cardController.getAllCards)
  .delete(cardController.deleteAll)

router.route('/card-type')
  .get(cardController.cardType)

router.route('/:id')
  .get(cardController.getCard)
  .delete(cardController.deleteCard)
  .put(cardController.updateCard)

module.exports=router






