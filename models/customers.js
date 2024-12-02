const db = require("../db.js");

class Customer {
  // Register new customer with first name, last name, email, and password
  static async register(firstName, lastName, email, password) {
    const query = `INSERT INTO Customers (firstName, lastName, email, password)
                       VALUES (?, ?, ?, ?)`;
    return db.execute(query, [firstName, lastName, email, password]);
  }

  // Find a customer by email
  static async findByEmail(email) {
    const query = `SELECT * FROM Customers WHERE email = ?`;
    const [result] = await db.execute(query, [email]);

    // Return the customer if found, else null
    return result.length > 0 ? result[0] : null;
  }

  // Login function that combines findByEmail and plain password check
  static async login(email, password) {
    try {
      // Find customer by email
      const customer = await this.findByEmail(email);
      //console.log(email, password);

      // If no customer found, return null
      if (!customer) {
        return null;
      }

      // Verify password (plain text comparison)
      if (customer.password !== password) {
        return null;
      }

      // Return customer data if login is successful
      return customer;
    } catch (error) {
      throw new Error("Error during login process: " + error.message);
    }
  }

  // Update customer profile (add additional fields or update existing fields)
  // Update customer profile with partial fields
  static async updateProfile(customerID, fieldsToUpdate) {
    const setClause = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(', ');

    const query = `UPDATE Customers SET ${setClause} WHERE customerID = ?`;

    const values = [...Object.values(fieldsToUpdate), customerID];

    return db.execute(query, values);
  }

  // Get customer profile details (excluding password)
  static async getProfile(customerID) {
    console.log(customerID);
    const query = `SELECT username, firstName, lastName, email, phoneNumber, gender, dateOfBirth FROM Customers WHERE customerID = ?`;
    const [result] = await db.execute(query, [customerID]);

    // Return the customer if found, else null
    return result.length > 0 ? result[0] : null;
  }

  // Change password function
  static async changePassword(customerID, oldPassword, newPassword) {
    // First, find the customer by userID
    const query = `SELECT * FROM Customers WHERE customerID = ?`;
    const [result] = await db.execute(query, [customerID]);

    if (result.length === 0) {
      throw new Error("User not found");
    }

    const customer = result[0];

    // Check if the old password matches
    if (oldPassword !== customer.password) {
      throw new Error("Old password   is incorrect");
    }

    // Update the password in the database (without hashing)
    const updateQuery = `UPDATE Customers SET password = ? WHERE customerID = ?`;
    await db.execute(updateQuery, [newPassword, customerID]);
  }

    // Update customer password by email
    static async updatePasswordByEmail(email, newPassword) {
      const query = 'UPDATE Customers SET password = ? WHERE email = ?';
      return db.execute(query, [newPassword, email]);
    }

}

module.exports = Customer;
