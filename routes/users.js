const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserId, patchUserId, patchUserAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.get('/me', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(false).min(2).max(30),
    about: Joi.string().required(false).min(2).max(30),
    avatar: Joi.string().required(false),
  }),
}), patchUserId);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
