const db = require('../db.js');

class Product {
    // Get all products
    static async getAll() {
        return db.execute('SELECT p.*, c.categoryName FROM Products p JOIN Categories c ON p.category = c.categoryID')
            .then(result => result[0])
            .catch(err => {
                console.error('Error fetching products:', err.message);
                throw err;
            });
    }

    // Get products by categoryID
    static async getByCategory(categoryID) {
        const query = `SELECT p.*, c.categoryName 
                       FROM Products p 
                       JOIN Categories c ON p.category = c.categoryID 
                       WHERE p.category = ?`;
        return db.execute(query, [categoryID])
            .then(result => result[0])
            .catch(err => {
                console.error('Error fetching products by category:', err.message);
                throw err;
            });
    }

    // Fetch product details by productID (name, price, category, description)
    static async getByID(productID) {
        const query = `
            SELECT p.productName, p.imageURL, p.price, p.description FROM Products p WHERE p.productID = ?;
        `;
        try {
            const [result] = await db.execute(query, [productID]);
            return result[0];  // Return the first result (or null if not found)
        } catch (error) {
            console.error('Error fetching product by ID:', error.message);
            throw error;
        }
    }
}

module.exports = Product;
