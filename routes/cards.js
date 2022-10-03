const router = require('express').Router();
const { getCard, createCard, deleteCard } = require('../controllers/cards');

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

router.get('/', getCard);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

module.exports = router;
