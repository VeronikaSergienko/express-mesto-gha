const router = require('express').Router();
const Card = require('../models/card');

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

router.get('/cards', (req, res) => {
  // найти вообще всех
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

// сработает при POST-запросе на URL /users
router.post('/cards', (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, link } = req.body;
  // создадим документ на основе пришедших данных
  Card.create({ name, link })
  /* напишите код здесь */
    .then(card => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
