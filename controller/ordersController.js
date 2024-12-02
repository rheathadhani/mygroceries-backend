const Order = require('../models/orders');

const formatOrderResponse = (orders) => {
  return orders.map(order => ({
      status: order.status,
      time: order.status === 'Scheduled' ? order.scheduledDate : order.updatedDatetime,
      items: order.items.map(item => ({
          name: item.productName,
          quantity: item.quantity,
          price: item.productPrice
      }))
  }));
};


exports.getOrders = async (req, res) => {
  try {
    const status = req.query.status; // Get status query param if available
    const userID = req.userID; // Assuming you get the userID from the token

    let orders;
    if (status) {
      // Fetch orders by status
      orders = await Order.getOrdersByStatus(userID, status);
    } else {
      // Fetch all orders
      orders = await Order.getAllOrders(userID);
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};
