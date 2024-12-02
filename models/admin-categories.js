const db = require('../db.js'); // Importing the database connection

class Category {
  // Fetch all categories
  static async getAllCategories() {
    const query = `SELECT categoryID, categoryName, noOfProducts FROM Categories`;
    const [rows] = await db.execute(query);
    return rows;
  }

  // Add new category
  static async addCategory(categoryName, noOfProducts) {
    const query = `INSERT INTO Categories (categoryName, noOfProducts) VALUES (?, ?)`;
    const [result] = await db.execute(query, [categoryName, noOfProducts]);
    return result.insertId;
  }

  // Update category by ID
  static async updateProductCategory(categoryID, categoryName, noOfProducts) {
    const query = `UPDATE Categories SET categoryName = ?, noOfProducts = ? WHERE categoryID = ?`;
    await db.execute(query, [categoryName, noOfProducts, categoryID]);
  }

  // Delete category by ID
  static async deleteCategory(categoryID) {
    const query = `DELETE FROM Categories WHERE categoryID = ?`;
    await db.execute(query, [categoryID]);
  }

  // Get category by ID
  static async getCategoryById(categoryID) {
    const query = `SELECT categoryID, categoryName, noOfProducts FROM Categories WHERE categoryID = ?`;
    const [rows] = await db.execute(query, [categoryID]);
    return rows[0];
  }

  static async findCategoryById(categoryID){
    const query = `SELECT * FROM Categories WHERE categoryID = ?`;
    const [result] = await db.execute(query, [categoryID]);
  
    if (result.length > 0) {
      return result[0]; // Return the found category
    } else {
      throw new Error('Category not found');
    }
  }
}

module.exports = Category;
