require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized! Invalid token' });
        }

        req.userID = decoded.userID; // Attach the userID to the request
        console.log(req.userID)
        next();
    });
};

module.exports = verifyToken;
