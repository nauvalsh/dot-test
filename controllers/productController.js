const { Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/productService');

const { getAll, createOne, deleteOne } = require('./refactorController');

const getProducts = getAll(Product, 'products');
const createProduct = createOne(Product, 'product');
const deleteProduct = deleteOne(Product, 'product');
const getProductByCategory = catchAsync(async (req, res, next) => {
  const products = await productService.getProductByCategory(req.params.categoryId);

  res.status(200).json({
    status: 'success',
    data: {
      products
    }
  });
});

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  getProductByCategory
};
