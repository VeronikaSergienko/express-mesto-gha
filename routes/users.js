const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserId, patchUserId, patchUserAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUser);

router.get('/me', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUserId);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9aFA-F]))+/),
  }),
}), patchUserAvatar);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserId);

module.exports = router;
