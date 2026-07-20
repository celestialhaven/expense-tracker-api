function notFoundHandler(req, res) {
  return res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} was not found.`
  });
}

function errorHandler(error, req, res, next) {
  console.error('Unhandled application error:', error);

  if (res.headersSent) {
    return next(error);
  }

  // Handle invalid JSON request bodies.
  if (error instanceof SyntaxError && error.status === 400) {
    return res.status(400).json({
      message: 'The request body contains invalid JSON.'
    });
  }

  return res.status(error.status || 500).json({
    message:
      error.status && error.status !== 500
        ? error.message
        : 'An unexpected server error occurred.'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};