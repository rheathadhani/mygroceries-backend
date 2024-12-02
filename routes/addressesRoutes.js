const express = require('express');
const router = express.Router();
const addressesController = require('../controller/addressesController'); // Correct path

// Middleware for verifying JWT tokens
const verifyToken = require('../middleware/authentication');

// Routes for managing addresses (JWT-protected)
router.get('/addresses', verifyToken, addressesController.getAddresses); // Get all addresses for the user
router.post('/addresses', verifyToken, addressesController.addAddress);  // Add a new address
router.patch('/addresses/:ID', verifyToken, addressesController.updateAddress); // Update an existing address
router.delete('/addresses/:ID', verifyToken, addressesController.deleteAddress); // Delete an address by ID

module.exports = router;
