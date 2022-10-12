class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = AuthorizedError;
