const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Static Admin Email to check against the decoded token
const adminEmail = 'admin@mygroceries.com'; 

const verifyAdmin = (req, res, next) => {
  // Extract the token from the authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return 403 (Forbidden)
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized! Invalid token' });
    }

    // Check if the decoded email matches the static admin email
    if (decoded.email !== adminEmail) {
      return res.status(403).json({ message: 'Forbidden! Admins only' });
    }

    // Attach the user email to the request object and proceed
    req.userEmail = decoded.email; 
    next();
  });
};

module.exports = verifyAdmin;


