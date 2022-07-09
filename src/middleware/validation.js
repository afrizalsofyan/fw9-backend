const { validationResult } = require('express-validator');
const response = require('../helpers/standartResponse');

const profileValidation = (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()) {
    return response(res, 'validation error', error.array(), null, 400);
  }
  next();
};

module.exports = profileValidation;