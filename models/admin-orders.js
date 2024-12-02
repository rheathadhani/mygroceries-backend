const db = require('../db.js');

class AdminOrders {
    // Get all orders with customer details
    static async getAllOrders() {
        const query = `
          SELECT 
            o.orderID, 
            o.customerID, 
            o.status, 
            o.scheduledDate, 
            o.updatedDatetime, 
            o.shippingAddress, 
            CONCAT(c.firstName, ' ', c.lastName) AS customerName
          FROM Orders o
          INNER JOIN Customers c 
          ON o.customerID = c.customerID;
        `;
        return db.execute(query);
      }
  
    // Get order details by orderID (Fetch productName and quantity from OrderItems)
    static async getOrderDetails(orderID) {
      const query = `
        SELECT productName, quantity 
        FROM OrderItems
        WHERE orderID = ?;
      `;
      return db.execute(query, [orderID]);
    }
  
    // Update order status and updated datetime
    static async updateOrderStatus(orderID, status) {
      const query = `
        UPDATE Orders 
        SET status = ?, updatedDatetime = NOW()
        WHERE orderID = ?;
      `;
      return db.execute(query, [status, orderID]);
    }
  }
  
  module.exports = AdminOrders;
