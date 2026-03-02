const express = require('express');

const router = express.Router();

const users = require('./users.json');

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u._id === id);

  if (!user) {
    return res.status(404).json({
      message: 'ID de usuario no encontrado',
    });
  }

  return res.json(user);
});

module.exports = router;
