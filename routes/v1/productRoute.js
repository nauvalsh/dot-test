const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(productController.getProducts)
  .post(auth('admin'), productController.createProduct);

router.route('/all').post(auth('admin'), productController.createCatAndProduct);

router.route('/category/:categoryId').get(productController.getProductByCategory);

router.route('/:id/deactive').patch(auth('admin'), productController.deactiveProduct);
router.route('/:id').delete(auth('admin'), productController.deleteProduct);
router.route('/:id').put(auth('admin'), productController.updateProdct);

module.exports = router;
