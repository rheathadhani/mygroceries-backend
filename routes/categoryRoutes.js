const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController');

// Get all categories
router.get('/categories', categoriesController.getAllCategories);

// Add a new category
router.post('/categories', categoriesController.addCategory);

module.exports = router;
