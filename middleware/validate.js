const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: errors.array({ onlyFirstError: true }).map((error) => ({
        field: error.path,
        message: error.msg,
        location: error.location
      }))
    });
  }

  next();
}

module.exports = validateRequest;