const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/categories',
    route: categoryRoute
  }
];

defaultRoutes.map((route) => router.use(route.path, route.route));

module.exports = router;
