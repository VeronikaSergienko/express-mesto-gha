class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
