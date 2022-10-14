class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
