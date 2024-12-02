const express = require('express');
const router = express.Router();
const AdminOrders = require('../controller/adminOrdersController')
// Make sure this path is correct
const verifyAdmin  = require('../middleware/adminAuth');

// Get all orders
router.get('/admin/orders', verifyAdmin, AdminOrders.getAllOrders);

// Get order details by orderID
router.get('/admin/orders/:orderID/details', verifyAdmin, AdminOrders.getOrderDetails);

// Update order status
router.put('/admin/orders/:orderID/status', verifyAdmin, AdminOrders.updateOrderStatus);

module.exports = router;

