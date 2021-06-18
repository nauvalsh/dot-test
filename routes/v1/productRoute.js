const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(productController.getProducts)
  .post(auth('admin'), productController.createProduct);

router.route('/category/:categoryId').get(productController.getProductByCategory);

router.route('/:id').delete(auth('admin'), productController.deleteProduct);

module.exports = router;
