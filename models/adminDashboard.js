const db = require('../db.js'); // Importing the database connection

class AdminDashboard {

  // 1. Get sales over time (past 7 days)
  static async getSalesOverTime() {
    const query = `
      SELECT
        DATE(createdDatetime) AS day,
        SUM(amount) AS totalSales
      FROM Payments
      WHERE createdDatetime >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(createdDatetime)
      ORDER BY day ASC
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  // 2. Get product performance (Top 5 Products by Total Payments)
  static async getProductPerformance() {
    const query = `
      SELECT 
        productName,
        SUM(productPrice * quantity) AS totalSales
      FROM OrderItems
      JOIN Orders ON OrderItems.orderID = Orders.orderID
      JOIN Payments ON Orders.orderID = Payments.orderID
      GROUP BY productName
      ORDER BY totalSales DESC
      LIMIT 5
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  // 3. Get total statistics (Customers, Products, Revenue, Orders)
  static async getTotalStats() {
    const totalCustomersQuery = `SELECT COUNT(*) as totalCustomers FROM Customers`;
    const totalProductsQuery = `SELECT COUNT(*) as totalProducts FROM Products`;
    const totalRevenueQuery = `SELECT SUM(amount) as totalRevenue FROM Payments`;
    const totalOrdersQuery = `SELECT COUNT(*) as totalOrders FROM Orders`;

    const [totalCustomers] = await db.execute(totalCustomersQuery);
    const [totalProducts] = await db.execute(totalProductsQuery);
    const [totalRevenue] = await db.execute(totalRevenueQuery);
    const [totalOrders] = await db.execute(totalOrdersQuery);

    return {
      totalCustomers: totalCustomers[0].totalCustomers,
      totalProducts: totalProducts[0].totalProducts,
      totalRevenue: totalRevenue[0].totalRevenue,
      totalOrders: totalOrders[0].totalOrders
    };
  }

// Fetch top 5 largest orders by total price
static async getTop5LargestOrders() {
    const query = `
      SELECT 
        Orders.orderID, 
        CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerName, 
        Orders.totalPrice 
      FROM Orders
      JOIN Customers ON Orders.customerID = Customers.customerID
      ORDER BY Orders.totalPrice DESC
      LIMIT 5;
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  // 5. Get active customers (Top 5 customers with the highest number of orders)
  static async getActiveCustomers() {
    const query = `
      SELECT
        CONCAT(Customers.firstName, ' ', Customers.lastName) AS customerName,
        COUNT(Orders.orderID) AS orderCount
      FROM Customers
      JOIN Orders ON Customers.customerID = Orders.customerID
      GROUP BY Customers.customerID
      ORDER BY orderCount DESC
      LIMIT 5
    `;
    const [rows] = await db.execute(query);
    return rows;
  }
}

module.exports = AdminDashboard;
