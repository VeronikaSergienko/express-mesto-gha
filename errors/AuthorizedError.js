class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = 401;
  }
}

module.exports = AuthorizedError;
