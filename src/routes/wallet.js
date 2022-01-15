
const express = require("express");

const router = express.Router()

const {create,
    getAllWallets,
    getWallet,
    updateWallet,
    deleteWallet,
    deleteAll}= require('../controllers/wallet')

router.route('/').post(create).get(getAllWallets).delete(deleteAll)

router.route('/:id').get(getWallet).delete(deleteWallet).put(updateWallet)




module.exports=router






