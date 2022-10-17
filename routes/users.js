const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserId, patchUserId, patchUserAvatar, getProfile,
} = require('../controllers/users');

router.get('/', getUser);

router.get('/me', getProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(false).min(2).max(30),
    about: Joi.string().required(false).min(2).max(30),
    avatar: Joi.string().required(false).regex(/http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9aFA-F]))+/),
  }),
}), patchUserId);
router.patch('/me/avatar', patchUserAvatar);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }),
}), getUserId);

module.exports = router;
