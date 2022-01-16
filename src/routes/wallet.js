
const express = require("express");

const router = express.Router()

const walletController = require('../controllers/wallet')

router.route('/')
.post(walletController.create)
.get(walletController.getAllWallets)
.delete(walletController.deleteAll)

router.route('/:id')
.get(walletController.getWallet)
.delete(walletController.deleteWallet)
.put(walletController.updateWallet)

module.exports=router






