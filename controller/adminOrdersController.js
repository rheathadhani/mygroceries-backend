const AdminOrders = require('../models/admin-orders');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await AdminOrders.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get order details by orderID
exports.getOrderDetails = async (req, res) => {
  const { orderID } = req.params;
  
  try {
    const [orderDetails] = await AdminOrders.getOrderDetails(orderID);
    res.status(200).json({ orderDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderID } = req.params;
  const { status } = req.body;

  try {
    await AdminOrders.updateOrderStatus(orderID, status);
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};
