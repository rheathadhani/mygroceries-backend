const Category = require('../models/categories');

exports.getAllCategories = async (_req, res) => {
    try {
        const categories = await Category.getAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
    }
};

// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const result = await Category.insertCategory(categoryName);
        res.status(201).json({ message: 'Category added successfully', categoryID: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add category', error: error.message });
    }
};
