'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
        onDelete: 'cascade'
      });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: DataTypes.DOUBLE,
      desc: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products'
    }
  );
  return Product;
};
