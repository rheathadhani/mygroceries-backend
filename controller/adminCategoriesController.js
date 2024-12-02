const Category = require('../models/admin-categories');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();

    // Add updatedTime for each category (current time)
    const categoriesWithTime = categories.map(category => ({
      ...category,
      updatedTime: new Date().toLocaleString()
    }));

    res.status(200).json(categoriesWithTime);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  const { categoryName, noOfProducts } = req.body;

  try {
    const newCategoryId = await Category.addCategory(categoryName, noOfProducts);
    
    const addedCategory = await Category.getCategoryById(newCategoryId);
    addedCategory.updatedTime = new Date().toLocaleString(); // Add current time as updatedTime

    res.status(201).json({ message: 'Category added successfully', category: addedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add category', error: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const { categoryID } = req.params;
  const { categoryName, noOfProducts } = req.body;

  try {
    await Category.updateProductCategory(categoryID, categoryName, noOfProducts);
    
    const updatedCategory = await Category.findCategoryById(categoryID);
    updatedCategory.updatedTime = new Date().toLocaleString(); // Update time

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error in updateCategory:', error.message); // Log the full error
    res.status(500).json({ message: 'Failed to update category', error: error.message });
  }
};


// Delete category
exports.deleteCategory = async (req, res) => {
  const { categoryID } = req.params;

  try {
    await Category.deleteCategory(categoryID);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error: error.message });
  }
};
