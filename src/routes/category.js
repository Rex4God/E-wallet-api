
const express = require("express");


const router = express.Router()

const categoryController =require('../controllers/category')

router.route('/')
.post(categoryController.create)
.get(categoryController.getAllCategory)
.delete(categoryController.deleteAll)

router.route('/:id')
.get(categoryController.getCategory)
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)




module.exports=router






