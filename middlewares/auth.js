// const jwt = require('jsonwebtoken');
// const user = require('../models/user');
// const User = require('../models/user');

// const isAuthorized = (token) => {
//   return jwt.verify(token, 'some-secret-key', (error, decoded) => {
//     if (error) return false;
//     return User.findOne({ _id: decoded._id }).then((user) => {
//       return Boolean(user)
//     });
//   });
// };

// middlewares/auth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};