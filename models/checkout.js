const db = require('../db.js');

class Checkout {
    // Create a new order
    async createOrder(customerID, totalPrice, scheduledDate, shippingAddress) {
        const query = `INSERT INTO Orders (customerID, totalPrice, scheduledDate, shippingAddress, status) VALUES (?, ?, ?, ?, ?)`;
        const values = [
          customerID || null,
          totalPrice || null,
          scheduledDate || null,
          shippingAddress || null,
          'Scheduled'  // Set the default status to 'Scheduled'
        ];
      
        const [result] = await db.execute(query, values);
        return result.insertId; // Return the new orderID
      }      
  
    // Insert order items
// Insert order items with productName and productPrice instead of productID
    async createOrderItems(orderID, orderItems) {
        const query = `INSERT INTO OrderItems (orderID, productName, productPrice, quantity) VALUES (?, ?, ?, ?)`;
        const promises = orderItems.map(item =>
            db.execute(query, [orderID, item.productName, item.productPrice, item.quantity])
        );
        await Promise.all(promises); // Execute all insertions in parallel
    }

  
    // Create a new payment record
    async createPayment(userID, amount, paymentType, bankAccountID, cardID, orderID) {
      const query = `INSERT INTO Payments (userID, amount, paymentType, bankAccountID, cardID, orderID) VALUES (?, ?, ?, ?, ?, ?)`;
  
      // Pass `null` for bankAccountID or cardID if they are undefined
      await db.execute(query, [
        userID || null,
        amount || null,
        paymentType || null,
        bankAccountID || null,
        cardID || null,
        orderID || null
      ]);
    } 
  }
  
  module.exports = Checkout;
  