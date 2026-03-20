const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

// nuevas rutas
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;