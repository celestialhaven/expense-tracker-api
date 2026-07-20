const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const router = express.Router();

function getSwaggerDocument(req) {
  const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';

  return {
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [protocol.split(',')[0].trim()]
  };
}

router.use('/', swaggerUi.serve);
router.get('/', (req, res, next) => {
  return swaggerUi.setup(getSwaggerDocument(req))(req, res, next);
});

module.exports = router;
