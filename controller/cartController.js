const Cart = require('../models/cartItem');

// Fetch cart items for a user
exports.getCartItems = async (req, res) => {
  const { userID } = req; // Extract userID from the verified token

  try {
      const cartItems = await Cart.getCartItems(userID);
      if (cartItems.length > 0) {
          res.status(200).json(cartItems);
      } else {
          res.status(404).json({ message: 'No items found in the cart' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
  }
};

// Add item to cart (POST)
exports.addItemToCart = async (req, res) => {
  const { userID } = req;
  const { imageURL, productName, productPrice, quantity } = req.body;

  if (!imageURL || !productName || !productPrice || !quantity) {
    return res.status(400).json({ message: 'Product details and quantity are required' });
  }

  try {
    // Check if the product already exists in the cart
    const existingProduct = await Cart.findProductInCart(userID, productName);

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists in cart. Use the update quantity option.' });
    }

    // If the product does not exist, add a new product to the cart
    await Cart.addItemToCart(userID, imageURL, productName, productPrice, quantity);
    res.status(201).json({ message: 'Item added to cart successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

// Update quantity in cart (PATCH)
exports.updateProductQuantity = async (req, res) => {
  const { userID } = req;
  const { productName, quantity } = req.body;

  if (!productName || !quantity) {
    return res.status(400).json({ message: 'Product name and new quantity are required' });
  }

  try {
    // Find the product in the cart
    const existingProduct = await Cart.findProductInCart(userID, productName);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity of the product
    await Cart.updateProductQuantity(userID, productName, quantity);
    res.status(200).json({ message: 'Product quantity updated successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Failed to update product quantity', error: error.message });
  }
};

// Get product from the cart by product name for a specific user
exports.getProductInCart = async (req, res) => {
  const { userID } = req; // Extract userID from the request
  const { productName } = req.params; // Get product name from the URL params

  try {
      const product = await Cart.findProductByName(userID, productName);
      if (product) {
          res.status(200).json(product);
      } else {
          res.status(404).json({ message: 'Product not found in cart' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve product from cart', error: error.message });
  }
};

// Updated removeItemFromCart controller
exports.removeItemFromCart = async (req, res) => {
  const { userID } = req; // Get the userID from the request (from token)
  const { productName } = req.body; // Expect productName in the body

  if (!productName) {
      return res.status(400).json({ message: 'Product name is required to remove item from cart' });
  }

  try {
      // Call the model method to remove the item
      await Cart.removeItemFromCart(userID, productName);
      res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

// Controller to clear all items from the cart
exports.clearCart = async (req, res) => {
  const { userID } = req; // Get the userID from the request (from token)

  try {
    // Call the model method to remove all items from the user's cart
    await Cart.clearAllItems(userID); // No need for productName here
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
};


