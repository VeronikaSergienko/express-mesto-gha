/* eslint-disable no-param-reassign, no-underscore-dangle */
const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const ValidationErrorStatus = require('../utils/constants');

// GET /cards — возвращает все карточки
const getCard = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

// POST /cards — создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ValidationErrorStatus).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFound('Карточка с указанным _id не найдена.'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ValidationErrorStatus).send({ message: 'Передан некорректный _id' });
      } else if (err.status === 404) {
        res.status(err.status).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFound('Карточка с указанным _id не найдена.'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ValidationErrorStatus).send({ message: 'Передан некорректный id.' });
      } else if (err.status === 404) {
        res.status(err.status).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFound('Карточка с указанным _id не найдена.'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ValidationErrorStatus).send({ message: 'Передан некорректный id.' });
      } else if (err.status === 404) {
        res.status(err.status).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
