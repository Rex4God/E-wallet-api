const Card = require("../models/cards");
const {StatusCodes} =require('http-status-codes')
const passport =require('../auth/passport')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllCards = async (req, res) => {
    const cards = await Card.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ cards, count: cards.length })
  }
  const getCard = async (req, res) => {
    const {
      user: { userId },
      params: { id: cardId },
    } = req
  
    const card = await Card.findOne({
      id: cardId,
      createdBy: userId,
    })
    if (!card) {
      throw new NotFoundError(`No job with id ${cardId}`)
    }
    res.status(StatusCodes.OK).json({ card })
  }
  
  const createCard = async (req, res) => {
    req.body.createdBy = req.user.userId
    const card = await Card.create(req.body)
    res.status(StatusCodes.CREATED).json({ card })
  }
  
  const updateCard = async (req, res) => {
    const {
      body: { cardType, amount },
      user: { userId },
      params: { id: cardId },
    } = req
  
    if (cardType === '' || amount===  '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const card = await Card.findByIdAndUpdate(
      { id: cardId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!card) {
      throw new NotFoundError(`No job with id ${cardId}`)
    }
    res.status(StatusCodes.OK).json({ card})
  }
  
  const deleteCard = async (req, res) => {
    const {
      user: { userId },
      params: { id: cardId },
    } = req
  
    const card= await Card.findByIdAndRemove({
      id: cardId,
      createdBy: userId,
    })
    if (!card) {
      throw new NotFoundError(`No job with id ${cardId}`)
    }
    res.status(StatusCodes.OK).send()
  }
  
  module.exports = {
    createCard,
    deleteCard,
    getAllCards,
    updateCard,
    getCard,
  }


