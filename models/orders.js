const db = require('../db');

class Order {
  // Fetch all orders for a user
  static async getAllOrders(userID) {
    const query = `SELECT Orders.*, OrderItems.productName, OrderItems.productPrice, OrderItems.quantity
                   FROM Orders
                   JOIN OrderItems ON Orders.orderID = OrderItems.orderID
                   WHERE Orders.customerID = ?`;
    const [rows] = await db.execute(query, [userID]);
    return rows;
  }

  // Fetch orders by status
  static async getOrdersByStatus(userID, status) {
    const query = `SELECT Orders.*, OrderItems.productName, OrderItems.productPrice, OrderItems.quantity
                   FROM Orders
                   JOIN OrderItems ON Orders.orderID = OrderItems.orderID
                   WHERE Orders.customerID = ? AND Orders.status = ?`;
    const [rows] = await db.execute(query, [userID, status]);
    return rows;
  }
}

module.exports = Order;
