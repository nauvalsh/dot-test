const { Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/productService');
const redis = require('../redis');

const { getAll, createOne, deleteOne, updateOne } = require('./refactorController');
const AppError = require('../utils/appError');

const getProducts = getAll(Product, 'products');
const createProduct = createOne(Product, 'products');
const deleteProduct = deleteOne(Product, 'products');
const updateProdct = updateOne(Product, 'products');

const getProductByCategory = catchAsync(async (req, res, next) => {
  const products = await productService.getProductByCategory(req.params.categoryId);

  res.status(200).json({
    status: 'success',
    data: {
      products
    }
  });
});

const deactiveProduct = catchAsync(async (req, res, next) => {
  const [updatedRows] = await Product.update(
    { isActive: false },
    { where: { id: req.params.id } }
  );

  if (!updatedRows) throw new AppError('No data found', 404);

  redis.redisDelAsync('products');
  res.status(200).json({
    status: 'success',
    message: 'Product has been deactivated successfully'
  });
});

const createCatAndProduct = catchAsync(async (req, res, next) => {
  const categoryAndProduct = await productService.createCatAndProduct(req.body);

  await redis.redisDelAsync('products');
  await redis.redisDelAsync('categories');

  res.status(200).json({
    status: 'success',
    data: categoryAndProduct
  });
});

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  getProductByCategory,
  updateProdct,
  deactiveProduct,
  createCatAndProduct
};
