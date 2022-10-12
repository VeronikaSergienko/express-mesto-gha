const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const { BAD_DATA_CODE, SERVER_ERROR_CODE } = require('../utils/constants');

// GET /cards — возвращает все карточки
const getCard = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

// POST /cards — создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_DATA_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFound('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
