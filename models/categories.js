const db = require('../db.js');

class Category {
    static async getAll() {
        return db.execute('SELECT categoryID, categoryName, noOfProducts FROM Categories')
            .then(result => result[0])
            .catch(err => {
                console.error('Error executing query:', err.message);
                throw err; 
            });
    }

    static async insertCategory(categoryName) {
        return db.execute('INSERT INTO Categories (categoryName, noOfProducts) VALUES (?, ?)', [categoryName])
            .then(result => result[0])
            .catch(err => {
                console.error('Error adding category:', err.message);
                throw err;
            });
    }
}

module.exports = Category;
