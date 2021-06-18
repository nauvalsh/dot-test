const AppError = require('../utils/appError');
const { Category, Product } = require('../models/index');
const config = require('../config/config');

/**
 *
 * @param {*} categoryId
 * @returns
 */
let getProductByCategory = async (categoryId) => {
  let products = await Product.findAll({
    where: {
      categoryId: categoryId
    },
    include: [
      {
        model: Category,
        as: 'category'
      }
    ]
  });

  return products;
};

module.exports = {
  getProductByCategory
};
