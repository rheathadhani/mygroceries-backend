const ShippingAddress = require('../models/shippingaddresses');

// Get all addresses for the logged-in user
exports.getAddresses = async (req, res) => {
    const { userID } = req;

    try {
        const [addresses] = await ShippingAddress.getAddressesByCustomerID(userID);
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve addresses', error: error.message });
    }
};
    
exports.addAddress = async (req, res) => {
    const { userID } = req;
    const { Name, phoneNumber, address } = req.body;

    //console.log('Received Data:', { userID, Name, phoneNumber, address }); // Log incoming data

    try {
        await ShippingAddress.addAddress(userID, Name, phoneNumber, address);
        res.status(201).json({ message: 'Address added successfully' });
    } catch (error) {
        console.error('Database Insertion Error:', error); // Log detailed error
        res.status(500).json({ message: 'Failed to add address', error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    const { userID } = req;  // Extract userID from the token
    const { name, phoneNumber, address } = req.body;  // Extract fields from the request body
    const { ID } = req.params;  // Extract the address ID from the URL parameters
  
    if (!ID) {
      return res.status(400).json({ message: 'Address ID is required' }); // Validate that the ID is present
    }
  
    // Create an object for only the fields that are provided in the request
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;
    if (address) fieldsToUpdate.address = address;
  
    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
  
    try {
      // Update the address with the fields provided
      await ShippingAddress.updateAddress(ID, userID, fieldsToUpdate);
      res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      console.error('Failed to update address:', error);
      res.status(500).json({ message: 'Failed to update address', error: error.message });
    }
  };
    

// Delete an address
exports.deleteAddress = async (req, res) => {
    const { userID } = req;
    const { ID } = req.params;

    try {
        await ShippingAddress.deleteAddress(ID, userID);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete address', error: error.message });
    }
};
