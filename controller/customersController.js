const Customer = require('../models/customers');
const jwt = require('jsonwebtoken');

// Secret key for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to validate password
function validatePassword(password) {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$]/.test(password);

    return minLength && hasUpperCase && hasSpecialChar;
}

// Register a new customer
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate password
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long, contain at least one uppercase letter, and one special character (!@#$).' });
    }

    try {
        const existingCustomer = await Customer.findByEmail(email);
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        await Customer.register(firstName, lastName, email, password);

        // After successful registration, generate a JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' }); // Token expires in 2 houra

        res.status(201).json({ message: 'Customer registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register customer', error: error.message });
    }
};

// Login a customer
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.login(email, password);
        //console.log(email, password)
        if (!customer) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If the login is successful, generate a JWT token
        const token = jwt.sign({ userID: customer.customerID, email: customer.email }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: 'Login successful',
            token // Return the token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};


// Get the customer profile
exports.getProfile = async (req, res) => {
    const { userID } = req;
    console.log(userID);

    try {
        const customer = await Customer.getProfile(userID);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer profile', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { userID } = req;
    const { username, firstName, lastName, email, phoneNumber, gender, dob } = req.body;

    const fieldsToUpdate = {};

    if (username) fieldsToUpdate.username = username;
    if (firstName) fieldsToUpdate.firstName = firstName;
    if (lastName) fieldsToUpdate.lastName = lastName;
    if (email) fieldsToUpdate.email = email;
    if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;
    if (gender) fieldsToUpdate.gender = gender;

    // Ensure the dateOfBirth is properly formatted and provided as 'YYYY-MM-DD'
    if (dob) {
        try {
            const formattedDOB = new Date(dob).toISOString().slice(0, 10); // Format to 'YYYY-MM-DD'
            fieldsToUpdate.dateOfBirth = formattedDOB;
            console.log('Formatted DOB:', formattedDOB); // Log the formatted date
        } catch (error) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
    }

    // Log fields to update
    console.log('Fields to update:', fieldsToUpdate);

    // Check if there are fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    try {
        await Customer.updateProfile(userID, fieldsToUpdate); // Assuming Customer.updateProfile is the function that handles the DB update
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Failed to update profile:', error.message); // Log the error
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};



// Change password controller
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body; // Old and new passwords from request
    const { userID } = req; // The authenticated user's ID (from the JWT middleware)

    try {
        // Call the changePassword method from the model
        await Customer.changePassword(userID, oldPassword, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Reset password based on email
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Find customer by email
      const customer = await Customer.findByEmail(email);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Validate the new password
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          message: 'Password must be at least 6 characters long, contain at least one uppercase letter, and one special character (!@#$).'
        });
      }
  
      // Update the password
      await Customer.updatePasswordByEmail(email, newPassword);
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
  };
  