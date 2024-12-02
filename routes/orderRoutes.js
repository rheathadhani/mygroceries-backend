const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordersController');
const verifyToken = require('../middleware/authentication'); // Middleware for JWT authentication


router.get('/orders', verifyToken, orderController.getOrders);
//router.get('/orders/status/:status', verifyToken, ordersController.getOrdersByStatus);

module.exports = router;
