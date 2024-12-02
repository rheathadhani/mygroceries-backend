const Product = require('../models/products');

// Get all products or products by category
exports.getAllProducts = async (req, res) => {
    const { categoryID } = req.query; // Get categoryID from query parameters
    try {
        let products;
        if (categoryID) {
            products = await Product.getByCategory(categoryID); // Fetch products by categoryID
        } else {
            products = await Product.getAll(); // Fetch all products
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

// Get product details by productID
exports.getProductByID = async (req, res) => {
    const { productID } = req.params;
    try {
        const product = await Product.getByID(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Return only the fields: name, price, category, and description
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
};