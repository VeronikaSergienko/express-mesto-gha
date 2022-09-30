const router = require('express').Router();
const User = require('../models/user');

// GET /users — возвращает всех пользователей
// router.get("/users", )

// GET /users/:userId - возвращает пользователя по _id

// POST /users — создаёт пользователя

router.get('/users', (req, res) => {
  // найти вообще всех
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

// сработает при POST-запросе на URL /films
router.post('/users', (req, res) => {
  // получим из объекта запроса имя и описание пользователя
  const { name, about, avatar } = req.body;
  // создадим документ на основе пришедших данных
  User.create({ name, about, avatar })
  /* напишите код здесь */
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
