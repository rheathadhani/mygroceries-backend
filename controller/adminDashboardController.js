const AdminDashboard = require('../models/adminDashboard'); // Importing the Admin Dashboard model

// 1. Sales over time
exports.getSalesOverTime = async (req, res) => {
  try {
    const salesOverTime = await AdminDashboard.getSalesOverTime();
    res.status(200).json(salesOverTime);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve sales over time', error: error.message });
  }
};

// 2. Product performance
exports.getProductPerformance = async (req, res) => {
  try {
    const productPerformance = await AdminDashboard.getProductPerformance();
    res.status(200).json(productPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product performance', error: error.message });
  }
};

// 3. Total statistics (customers, products, revenue, orders)
exports.getTotalStats = async (req, res) => {
  try {
    const totalStats = await AdminDashboard.getTotalStats();
    res.status(200).json(totalStats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve total statistics', error: error.message });
  }
};

// 4. Active customers
exports.getActiveCustomers = async (req, res) => {
  try {
    const activeCustomers = await AdminDashboard.getActiveCustomers();
    res.status(200).json(activeCustomers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve active customers', error: error.message });
  }
};

// 5. Get Top 5 Largest Orders
exports.getTop5LargestOrders = async (req, res) => {
    try {
      const largestOrders = await AdminDashboard.getTop5LargestOrders();
      res.status(200).json(largestOrders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve largest orders', error: error.message });
    }
  };