const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');

// GET /cards — возвращает все карточки
const getCard = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      if (cards.length === 0) {
        throw new NotFound('Карточки не найдены');
      } res.send({ data: cards });
    })
    .catch(next);
};

// POST /cards — создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (ownerId === card.owner.toString()) {
          card.delete()
            .then(() => res.status(200).json({ message: 'Карточка успешно удалена' }));
        } else { throw new ForbiddenError('Карточку может удалять только владелец карточки.'); }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('не корректный id'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFound('Карточка не найдена'))
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
    .orFail(new NotFound('Карточка не найдена'))
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
