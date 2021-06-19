const { Category } = require('../models');
const { getAll, createOne, deleteOne, updateOne } = require('./refactorController');

const getCategories = getAll(Category, 'categories');
const createCategory = createOne(Category, 'categories');
const updateCategory = createOne(Category, 'categories');
const deleteCategory = deleteOne(Category, 'categories');

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
};
