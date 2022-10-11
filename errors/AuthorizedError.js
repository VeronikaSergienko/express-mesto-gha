class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.message = message;
    this.status = 401;
  }
}

module.exports = AuthorizedError;
