const express = require('express');
const router = express.Router();
const checkoutController = require('../controller/checkoutController'); // Ensure the correct path
const verifyToken = require('../middleware/authentication');

router.post('/checkout', verifyToken, checkoutController.checkout);


module.exports = router;
