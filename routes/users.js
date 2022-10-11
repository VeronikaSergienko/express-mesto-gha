const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserId, patchUserId, patchUserAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.get('/me', getProfile);
router.patch('/me', patchUserId);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
