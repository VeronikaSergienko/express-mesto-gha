/* eslint-disable no-param-reassign, no-underscore-dangle */
const User = require('../models/user');
const NotFound = require('../errors/NotFound');

// GET /users — возвращает всех пользователей
const getUser = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка по-умолчанию' }));
};

// POST /users — создаёт пользователя
const createUser = (req, res) => {
// получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Ошибка по-умолчанию' });
      }
    });
};

// GET /users/:userId - возвращает пользователя по _id
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else if (!!err.status && err.status === 404) {
        res.status(err.status).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка по-умолчанию' });
      }
    });
};

// PATCH /users/me — обновляет профиль
const patchUserId = (req, res) => {
  const { name, about, avatar } = req.body;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { name, about, avatar })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка по-умолчанию' });
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
const patchUserAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { avatar: newAvatar })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка по-умолчанию' });
      }
    });
};

module.exports = {
  getUser, createUser, getUserId, patchUserId, patchUserAvatar,
};
