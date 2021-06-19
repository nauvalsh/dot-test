const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { pagination } = require('../utils/helper');
const redis = require('../redis');

exports.createOne = (Model, table, fileField = false, userId = false) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body);

    if (req.file && fileField) req.body[fileField] = req.file.filename;
    if (userId) req.body.userId = req.user.id;
    // console.log(rewq.file);

    const newData = await Model.create(req.body);

    await redis.redisDelAsync(table);

    return res.status(200).json({
      status: 'success',
      data: {
        [table]: newData
      }
    });
  });

exports.deleteOne = (Model, table) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.destroy({ where: { id: req.params.id } });

    if (doc === 0) {
      return next(new AppError(`No document found with id ${req.params.id}`, 404));
    }

    await redis.redisDelAsync(table);

    return res.status(200).json({
      status: 'success',
      message: 'Data has been deleted successfully'
    });
  });

exports.getOne = (Model, table, includeModel = null) =>
  catchAsync(async (req, res) => {
    let result = await Model.findByPk(req.params.id, {
      include: includeModel,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    return res.status(200).json({
      status: 'success',
      [table]: result
    });
  });

exports.updateOne = (Model, table) =>
  catchAsync(async (req, res) => {
    let [updatedRows] = await Model.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    await redis.redisDelAsync(table);

    return res.status(200).json({
      status: 'success',
      [table]: updatedRows
    });
  });

exports.getAll = (Model, table, include) =>
  catchAsync(async (req, res, next) => {
    let redisData = await redis.redisGetAsync(table);

    if (redisData !== null) {
      return res.status(200).json({
        status: 'success',

        data: {
          [table]: JSON.parse(redisData)
        }
      });
    }

    const { count, rows } = await Model.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      ...pagination(req),
      include
    });

    await redis.redisSetAsync(table, 500, JSON.stringify(rows));

    // Response Query
    res.status(200).json({
      status: 'success',
      data: {
        [table]: rows
      }
    });
  });
