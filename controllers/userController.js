const catchAsync = require('../utils/catchAsync');
const { User, sequelize } = require('../models/index');
const { pagination } = require('../utils/helper');
const { Op } = require('sequelize');

exports.getUsers = catchAsync(async (req, res, next) => {
  const { count, rows } = await User.findAndCountAll({
    ...pagination(req),
  });

  res.status(200).json({
    status: 'success',
    count,
    results: rows.length,
    data: {
      users: rows,
    },
  });
});

exports.getUserByMonth = catchAsync(async (req,res,next) => {
  const {month,year} = req.params;

  const {count,rows} = await User.findAndCountAll({
    where: {
      createdAt: sequelize.literal(`MONTH(createdAt) = ${month} AND YEAR(createdAt) = ${year}`)

    }
  })
  // const [result,metadata] = await sequelize.query(`SELECT * FROM users 
  // WHERE MONTH(createdAt) = ${month} AND YEAR(createdAt) = ${year}`)

  res.status(200).json({
    status: 'success',
    count,
    data:{
      users: rows
    }
  })

})