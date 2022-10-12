class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFound;
