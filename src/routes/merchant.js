
const express = require("express");

const router = express.Router()

const merchantController= require('../controllers/merchant')

router.route('/')
.post(merchantController.create)
.get(merchantController.getAllMerchantTransactions)
.delete(merchantController.deleteAll)

router.route('/:id')
.get(merchantController.getTransaction)
.delete(merchantController.deleteMerchant)
.put(merchantController.updateMerchant)






module.exports=router