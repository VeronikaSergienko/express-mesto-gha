const router = require('express').Router();
const {
  getUser, getUserId, patchUserId, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.patch('/me', patchUserId);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
