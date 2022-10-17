const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// .pattern(/^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})*$/gm)

const {
  getUser, getUserId, patchUserId, patchUserAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);
router.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(false).min(2).max(30),
    about: Joi.string().required(false).min(2).max(30),
    avatar: Joi.string().required(false),
  }),
}), patchUserId);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
