const AppError = require('../utils/appError');
const { Category, Product, sequelize } = require('../models/index');
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

let createCatAndProduct = async (body) => {
  const transaction = await sequelize.transaction();

  try {
    const category = await Category.create(body.category, { transaction });
    const product = await Product.create(
      { categoryId: category.id, ...body.product },
      { transaction }
    );

    await transaction.commit();

    return { category, product };
  } catch (e) {
    console.log(e);
    await transaction.rollback();

    throw e;
  }
};

module.exports = {
  getProductByCategory,
  createCatAndProduct
};
