const express = require('express');
const router = express.Router();
const adminCategoriesController = require('../controller/adminCategoriesController');
const verifyAdmin = require('../middleware/adminAuth'); 

router.get('/admin/categories', verifyAdmin, adminCategoriesController.getCategories);

// Add a new category (Admin verification required, prefixed with /admin)
router.post('/admin/categories', verifyAdmin, adminCategoriesController.addCategory);

// Update category (Admin verification required, prefixed with /admin)
router.patch('/admin/categories/:categoryID', verifyAdmin, adminCategoriesController.updateCategory);

// Delete category (Admin verification required, prefixed with /admin)
router.delete('/admin/categories/:categoryID', verifyAdmin, adminCategoriesController.deleteCategory);

module.exports = router;
