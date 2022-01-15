
const express = require("express");


const router = express.Router()

const {create,
    getAllCategory,
    getCategory,
     deleteAll,
     updateCategory,
     deleteCategory}= require('../controllers/category')

router.route('/').post(create).get(getAllCategory).delete(deleteAll)

router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)




module.exports=router






