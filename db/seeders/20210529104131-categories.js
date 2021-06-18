'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'categories',
      [
        {
          categoryName: 'Mie Instant',
        },
        {
          categoryName: 'Sabun',
        },
        {
          categoryName: 'Shampo',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('categories', null, {});
     */

    await queryInterface.bulkDelete('categories', null, {});
  },
};
