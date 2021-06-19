const passport = require('passport');
const httpStatus = require('http-status');
const AppError = require('../utils/appError');

const auth = (...roles) => async (req, res, next) => {
  passport.authenticate('jwt', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(
          new AppError(err || info || 'Please authenticate', httpStatus.UNAUTHORIZED)
        );
      }

      if (roles.length) {
        if (!roles.includes(user.role)) {
          return next(new AppError(`Forbidden`, httpStatus.FORBIDDEN));
        }
      }

      return next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = auth;
