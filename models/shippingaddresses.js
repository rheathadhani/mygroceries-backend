const db = require('../db.js');

class ShippingAddress {
    // Get all addresses for a specific customer
    static async getAddressesByCustomerID(customerID) {
        const query = `SELECT * FROM ShippingAddresses WHERE customerID = ?`;
        return db.execute(query, [customerID]);
    }

    // Add a new address for a specific customer
    static async addAddress(customerID, name, phoneNumber, address) {
        const query = `INSERT INTO ShippingAddresses (customerID, Name, phoneNumber, address)
                       VALUES (?, ?, ?, ?)`;
        return db.execute(query, [customerID, name, phoneNumber, address]);
    }

    // Update an existing address
    static async updateAddress(ID, customerID, fieldsToUpdate) {
        // Dynamically create the SET clause from the fields to update
        const setClause = Object.keys(fieldsToUpdate)
            .map(field => `${field} = ?`)
            .join(', ');
    
        const query = `UPDATE ShippingAddresses
                       SET ${setClause}
                       WHERE ID = ? AND customerID = ?`;
    
        // Collect the values of the fields to update along with addressID and customerID
        const values = [...Object.values(fieldsToUpdate), ID, customerID];
    
        return db.execute(query, values);
    }
    
    // Delete an address by its ID and customerID
    static async deleteAddress(ID, customerID) {
        const query = `DELETE FROM ShippingAddresses WHERE ID = ? AND customerID = ?`;
        return db.execute(query, [ID, customerID]);
    }
}

module.exports = ShippingAddress;
