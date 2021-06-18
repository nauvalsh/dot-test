const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(categoryController.getCategories)
  .post(auth('admin'), categoryController.createCategory);

router.route('/:id').delete(auth('admin'), categoryController.deleteCategory);
router.route('/:id').patch(auth('admin'), categoryController.deleteCategory);

module.exports = router;
