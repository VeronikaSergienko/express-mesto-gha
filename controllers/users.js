/* eslint-disable no-param-reassign, no-underscore-dangle */
const User = require('../models/user');



// GET /users — возвращает всех пользователей
const getUser = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// POST /users — создаёт пользователя
const createUser = (req, res) => {
// получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send(err));
};

// GET /users/:userId - возвращает пользователя по _id
const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// PATCH /users/me — обновляет профиль
const patchUserId = (req, res) => {
  const { name, about, avatar } = req.body;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// PATCH /users/me/avatar — обновляет аватар
const patchUserAvatar = (req, res) => {
  const newAvatar = req.body.avatar;
  const ownerId = req.user._id;
  User.findByIdAndUpdate(ownerId, { avatar: newAvatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUser, createUser, getUserId, patchUserId, patchUserAvatar };
