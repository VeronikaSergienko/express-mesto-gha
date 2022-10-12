class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
