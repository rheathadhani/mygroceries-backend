const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Static Admin Credentials stored here
const adminCredentials = {
  email: 'admin@mygroceries.com', 
  password: 'MYgroceries@2024' 
};

// Admin login logic
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  // Validate the credentials
  if (email !== adminCredentials.email || password !== adminCredentials.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // If valid, generate a JWT token with the email
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });

  // Respond with the generated token
  res.status(200).json({ message: 'Admin login successful', token });
};


