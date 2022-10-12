const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;

// celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(true),
//     link: Joi.string().required(true),
//     owner: Joi.object().required(true),
//     likes: Joi.object().required(true),
//     createdAt: Joi.date().required(false),
//   }),
// }),
