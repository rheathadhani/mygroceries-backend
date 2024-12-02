const db = require('../db.js');

class Cart {
    // Get all cart items for a specific user
    static async getCartItems(userID) {
        const query = `SELECT * FROM Cart WHERE userID = ?`;
        const [result] = await db.execute(query, [userID]);
        return result;
    }
    // Check if a product already exists in the cart for a specific user
    static async findProductInCart(userID, productName) {
        const query = `SELECT * FROM Cart WHERE userID = ? AND productName = ?`;
        const [rows] = await db.execute(query, [userID, productName]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Add a new product to the cart
    static async addItemToCart(userID, imageURL, productName, productPrice, quantity) {
        const query = `INSERT INTO Cart (userID, imageURL, productName, productPrice, quantity)
                       VALUES (?, ?, ?, ?, ?)`;
        return db.execute(query, [userID, imageURL, productName, productPrice, quantity]);
    }

    // Update the quantity of an existing product in the cart directly
    static async updateProductQuantity(userID, productName, quantity) {
        const query = `UPDATE Cart SET quantity = ? WHERE userID = ? AND productName = ?`;
        return db.execute(query, [quantity, userID, productName]);
    }

    // Find a product in the cart by userID and productName
    static async findProductByName(userID, productName) {
        const query = `SELECT * FROM Cart WHERE userID = ? AND productName = ?`;
        const [rows] = await db.execute(query, [userID, productName]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Remove item from cart
    static async removeItemFromCart(userID, productName) {
        const query = `DELETE FROM Cart WHERE userID = ? AND productName = ?`;
        return db.execute(query, [userID, productName]);
    }

    // Clear all items from the cart for a specific user
    static async clearAllItems(userID) {
    const query = `DELETE FROM Cart WHERE userID = ?`;
    return db.execute(query, [userID]);
    }
}

module.exports = Cart;
