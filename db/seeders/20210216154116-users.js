'use strict';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let faker = require('faker');
let data = [];

// password = test123
for (let i = 0; i < 50; i++) {
  if (i === 0) {
    data.push({
      name: 'Nauval S',
      email: 'nauvalsh@gmail.com',
      phoneNumber: '087875789220',
      password: '$2a$08$J.gYPG4tIeOTsTsOPauC5OC.6uinjSExXJhrPuXIrvPrsVp18T45S',
      photo: faker.internet.avatar(),
      role: 'admin',
      createdAt: randomDate(new Date(2021, 0, 1), new Date())
    });
  }

  data.push({
    name: faker.name.findName().toUpperCase(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: `${81222695880 + i}`,
    password: '$2a$08$J.gYPG4tIeOTsTsOPauC5OC.6uinjSExXJhrPuXIrvPrsVp18T45S',
    photo: faker.internet.avatar(),
    role: 'user',
    createdAt: randomDate(new Date(2021, 0, 1), new Date())
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
