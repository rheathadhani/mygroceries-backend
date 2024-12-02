const express = require('express');
const router = express.Router();
const customersController = require('../controller/customersController');
const verifyToken = require('../middleware/authentication'); // Import verifyToken middleware

// Register and Login routes (no token required)
router.post('/register', customersController.register);
router.post('/login', customersController.login);
router.post('/reset-password', customersController.resetPassword);

// Protected routes (token required)
router.get('/profile', verifyToken, customersController.getProfile); // Profile access requires token
router.patch('/profile', verifyToken, customersController.updateProfile); // Updating profile requires token

router.put('/change-password', verifyToken, customersController.changePassword);

module.exports = router;
