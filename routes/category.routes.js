const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router.get('/categories', CategoryController.getAllCategories);

router.get('/category/:id', CategoryController.getCategory);

router.post('/category', isAuth, [
    body('name').trim().not().isEmpty()
],CategoryController.postCategory);

router.delete('/category/:id', isAuth, CategoryController.deleteCategory);

module.exports = router;