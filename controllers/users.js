/* eslint-disable no-param-reassign, no-underscore-dangle */
const User = require('../models/user');

// GET /users — возвращает всех пользователей
// router.get("/users", )

// GET /users/:userId - возвращает пользователя по _id

// POST /users — создаёт пользователя

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

const getUser = (req, res) => {
  // найти вообще всех
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
// получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send(err));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUser, createUser, getUserId };
