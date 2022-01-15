
const express = require("express");

const router = express.Router()

const {create,
    getAllMerchantTransactions,
    getTransaction, 
    deleteAll,
    updateMerchant,
    deleteMerchant}= require('../controllers/merchant')

router.route('/').post(create).get(getAllMerchantTransactions).delete(deleteAll)

router.route('/:id').get(getTransaction).delete(deleteMerchant).put(updateMerchant)






module.exports=router