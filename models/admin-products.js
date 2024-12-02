const db = require("../db.js"); // Adjust the path based on your structure

class Product {
  // Get all products
  static async getAllProducts() {
    const query = `
      SELECT Products.productID, Products.productName, Products.price, Categories.categoryName, Products.imageURL, Products.description FROM Products 
                   JOIN Categories ON Products.category = Categories.categoryID`;

    const [result] = await db.execute(query);
    return result;
  }

  // Get a product by ID
  static async getProductById(productID) {
    const query = `SELECT Products.productID, Products.productName, Products.price, Categories.categoryName, Products.imageURL, Products.description FROM Products 
                   JOIN Categories ON Products.category = Categories.categoryID
                   WHERE Products.productID = ?`;
    const [result] = await db.execute(query, [productID]);
    return result[0];
  }

  // Add a new product
  // Add a new product
  static async addProduct(
    productName,
    price,
    imageURL,
    description,
    categoryID
  ) {
    const query = `INSERT INTO Products (productName, price, category, imageURL, description) 
                 VALUES (?, ?, ?, ?, ?)`;
    return db.execute(query, [
      productName,
      price,
      categoryID,
      imageURL,
      description,
    ]);
  }

  // Update product using PATCH (Partial update)
  static async updateProduct(productID, updates) {
    // Remove `updatedDate` if it's present in the updates object
    if ('updatedDate' in updates) {
      delete updates.updatedDate;
    }
  
    // Build the query dynamically based on the fields in updates object
    const fields = Object.keys(updates)
      .map((field) => {
        if (field === 'categoryID') {
          return `category = ?`; // Map `categoryID` to `category` column
        }
        return `${field} = ?`;
      })
      .join(", ");
  
    const values = Object.values(updates);
  
    if (fields.length === 0) {
      throw new Error("No fields to update");
    }
  
    // Update only the specified fields
    const query = `UPDATE Products SET ${fields} WHERE productID = ?`;
    const [result] = await db.execute(query, [...values, productID]);
  
    return result;
  }
  
  // Delete product by ID
  static async DeleteProduct(productID) {
    const query = `DELETE FROM Products WHERE productID = ?`;
    return db.execute(query, [productID]);
  }
}

module.exports = Product;
