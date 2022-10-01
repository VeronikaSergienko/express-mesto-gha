/* eslint-disable no-param-reassign, no-underscore-dangle */
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  // найти вообще всех
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.postUser = (req, res) => {
// получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
  /* напишите код здесь */
    .then((user) => res.status(200).send({ data: user }))
  // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send(err));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
