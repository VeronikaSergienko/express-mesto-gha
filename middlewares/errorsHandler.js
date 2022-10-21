const { isCelebrateError } = require('celebrate');

const errorsHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    res.status(statusCode).json(err);
  } else {
    res.status(statusCode).json({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }
  next();
};

module.exports = { errorsHandler };
