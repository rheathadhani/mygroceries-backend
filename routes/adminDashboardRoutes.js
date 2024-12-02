const express = require('express');
const router = express.Router();
const AdminDashboardController = require('../controller/adminDashboardController');
const verifyAdmin = require('../middleware/adminAuth');

// Admin dashboard routes
router.get('/admin/sales-over-time', verifyAdmin, AdminDashboardController.getSalesOverTime);
router.get('/admin/product-performance', verifyAdmin, AdminDashboardController.getProductPerformance);
router.get('/admin/total-stats', verifyAdmin, AdminDashboardController.getTotalStats);
router.get('/admin/active-customers', verifyAdmin, AdminDashboardController.getActiveCustomers);
router.get('/admin/largest-orders', verifyAdmin, AdminDashboardController.getTop5LargestOrders);
module.exports = router;
