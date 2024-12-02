const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const verifyToken = require('../middleware/authentication'); 

router.get('/cart', verifyToken, cartController.getCartItems); 
router.post('/cart', verifyToken, cartController.addItemToCart);
router.patch('/cart', verifyToken, cartController.updateProductQuantity);
router.get('/cart/:productName', verifyToken, cartController.getProductInCart);
router.delete('/cart', verifyToken, cartController.removeItemFromCart);
router.delete('/cart/clear', verifyToken, cartController.clearCart); // New route to clear all cart items

module.exports = router;
