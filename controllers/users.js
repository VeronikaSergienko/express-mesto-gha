const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const AuthorizedError = require('../errors/AuthorizedError');
// const ValidationError = require('../errors/AuthorizedError');
const { NOT_FOUND_ERROR_CODE, BAD_DATA_CODE, SERVER_ERROR_CODE } = require('../utils/constants');

// GET /users — возвращает всех пользователей
const getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// POST /signup — создаёт пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then(({
      name, about, _id, avatar, createdAt, email,
    }) => {
      res.send({
        name, about, _id, avatar, createdAt, email,
      });
    })
    .catch(next);
};

// GET /users/me - возвращает информацию о текущем пользователе
const getProfile = (req, res) => {
  User.findById(req.user._id)
    // .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    // .then((user) => {
    //   if (user) {
    //     res.send({ data: user });
    //   }
    //   throw new NotFound('Нет пользователя с таким id');
    // })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_DATA_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'что-то другое' });
      }
    });
};

// GET /users/:userId - возвращает пользователя по _id
const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
};

// PATCH /users/me — обновляет профиль
const patchUserId = (req, res) => {
  const { name, about, avatar } = req.body;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { name, about, avatar }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_DATA_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.name === 'CastError') {
        res.status(BAD_DATA_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      } else if (err.status === 404) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
const patchUserAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { avatar: newAvatar }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// POST /signin — логинит пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AuthorizedError({ message: 'Передан неверный логин или пароль' });
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizedError({ message: 'Передан неверный логин или пароль' });
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          throw new AuthorizedError('Передан неверный логин или пароль');
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  getUser, createUser, getUserId, patchUserId, patchUserAvatar, login, getProfile,
};
