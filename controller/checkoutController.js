const Checkout = require('../models/checkout'); // Import the Checkout class

// Create an instance of the Checkout class
const checkout = new Checkout();

const CheckoutController = {
    async checkout(req, res) {
        const userID = req.userID;  // Ensure userID is retrieved correctly from req

        const { totalPrice, scheduledDate, shippingAddress, paymentType, bankAccountID, cardID, orderItems } = req.body;

        try {
            console.log('Checkout Request Body:', req.body); // Log full request body for debugging

            // 1. Create a new order
            console.log('Creating Order...');
            const orderID = await checkout.createOrder(userID, totalPrice, scheduledDate, shippingAddress);
            console.log('Order Created:', orderID);

            // 2. Insert order items
            console.log('Creating Order Items...');
            await checkout.createOrderItems(orderID, orderItems);
            console.log('Order Items Created');


            // 3. Create a new payment record
            console.log('Creating Payment Record...');
            await checkout.createPayment(userID, totalPrice, paymentType, bankAccountID, cardID, orderID);
            console.log('Payment Created');

            // 4. Send success response
            res.status(201).json({ message: 'Checkout successful', orderID });
        } catch (error) {
            console.error('Error during checkout:', error); // Log full error details
            res.status(500).json({ message: 'Checkout failed', error: error.message });
        }
    }
};

module.exports = CheckoutController;

