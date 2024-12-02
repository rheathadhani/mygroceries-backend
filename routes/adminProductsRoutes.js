const express = require('express');
const router = express.Router();
const productsController = require('../controller/adminProductsController');
const verifyAdmin = require('../middleware/adminAuth'); 


// Get all products
router.get('/admin/products', verifyAdmin, productsController.getAllProducts);

/* // Get product by ID
router.get('/admin/products/:productID', verifyAdmin, productsController.getProductById);
 */

// Add new product
router.post('/admin/products', verifyAdmin, productsController.addProduct);

// Update product by ID
router.patch('/admin/products/:productID', verifyAdmin, productsController.updateProduct);

// Delete product by ID
router.delete('/admin/products/:productID', verifyAdmin, productsController.deleteProduct);


module.exports = router;
