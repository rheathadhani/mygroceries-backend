const Product = require('../models/admin-products');
const Category = require('../models/admin-categories');
const path = require('path');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    
    // Add a dynamic updatedDate field
    const productsWithUpdatedDate = products.map(product => ({
      ...product,
      updatedDate: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
    }));

    res.status(200).json(productsWithUpdatedDate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};


// Get a product by ID
exports.getProductById = async (req, res) => {
  const { productID } = req.params;
  try {
    const product = await Product.getProductById(productID);

    const productsWithUpdatedDate = products.map(product => ({
      ...product,
      updatedDate: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
    }));
    if (product) {
      res.status(200).json(productsWithUpdatedDate);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { categoryID, name, price, description, imageURL } = req.body;  // Expect imageURL
  //console.log(req.body);

  try {
    const productID = await Product.addProduct(name, price, imageURL, description, categoryID);
    res.status(201).json({ message: 'Product added successfully', product: { productID, name, price, description, imageURL, categoryID } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  //console.log('Request body:', req.body); // Log the body
  //console.log('Product ID:', req.params.productID); // Log the ID
  
  const { productID } = req.params;
  const updates = req.body;
  try {
    const result = await Product.updateProduct(productID, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found or no changes were made' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error in update:', error); // Log error details
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};


// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const result = await Product.DeleteProduct(productID);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
  
