const Customers = require('../models/admin-customers');

// Get all customers (for listing in the table)
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customers.getCustomers();
    //console.log(customers);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve customers', error: error.message });
  }
};

// Get customer details by ID
exports.getCustomerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customers.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve customer details', error: error.message });
  }
};


