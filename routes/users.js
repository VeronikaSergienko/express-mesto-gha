const router = require('express').Router();
const { postUser, getUser, getUserId } = require('../controllers/users');

// GET /users — возвращает всех пользователей
// router.get("/users", )

// GET /users/:userId - возвращает пользователя по _id

// POST /users — создаёт пользователя

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

router.get('/users', getUser);

router.get('/users/:userId', getUserId);

// сработает при POST-запросе на URL /users
router.post('/users', postUser);

module.exports = router;
