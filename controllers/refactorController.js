const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { pagination } = require('../utils/helper');

exports.createOne = (Model, table, fileField = false, userId = false) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body);

    if (req.file && fileField) req.body[fileField] = req.file.filename;
    if (userId) req.body.userId = req.user.id;
    // console.log(rewq.file);

    const newData = await Model.create(req.body);

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

    return res.status(200).json({
      status: 'success',
      data: {
        [table]: doc
      }
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

exports.updateOne = (Model, table, includeModel = null) =>
  catchAsync(async (req, res) => {
    let result = await Model.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    return res.status(200).json({
      status: 'success',
      [table]: result
    });
  });

exports.getAll = (Model, table, include) =>
  catchAsync(async (req, res, next) => {
    const { count, rows } = await Model.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      ...pagination(req),
      include
    });

    // Response Query
    res.status(200).json({
      status: 'success',
      count: count,
      results: rows.length,
      data: {
        [table]: rows
      }
    });
  });
