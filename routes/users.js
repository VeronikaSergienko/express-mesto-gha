const router = require('express').Router();
const { createUser, getUser, getUserId } = require('../controllers/users');

router.get('/', getUser);
router.post('/', createUser);

router.get('/:userId', getUserId);

module.exports = router;
