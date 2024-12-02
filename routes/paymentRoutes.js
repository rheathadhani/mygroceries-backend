const express = require('express');
const router = express.Router();
const { PaymentController } = require('../controller/paymentsController');
const verifyToken = require('../middleware/authentication'); 

// Route to get all payment details (bank accounts and cards)
router.get('/payments', verifyToken, PaymentController.getPayments);

// Route to add a bank account
router.post('/bank-account', verifyToken, PaymentController.addBankAccount);

// Route to delete a bank account
router.delete('/bank-account/:accountID', verifyToken, PaymentController.deleteBankAccount);

// Route to add a bank card
router.post('/bank-card', verifyToken, PaymentController.addBankCard);

// Route to delete a bank card
router.delete('/bank-card/:cardID', verifyToken, PaymentController.deleteBankCard);

module.exports = router;
