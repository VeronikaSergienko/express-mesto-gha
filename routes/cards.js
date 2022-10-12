const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    link: Joi.string().required(true),
    owner: Joi.object().required(true),
    likes: Joi.object().required(true),
    createdAt: Joi.date().required(false),
  }),
}), getCard);
router.post('/', createCard);
router.delete('/:cardId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
