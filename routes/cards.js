const router = require('express').Router();
const { getCard, createCard } = require('../controllers/cards');

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

router.get('/', getCard);

router.post('/', createCard);

module.exports = router;
