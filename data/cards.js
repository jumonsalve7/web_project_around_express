const express = require('express');

const router = express.Router();

const cards = require('./cards.json');

router.get('/', (req, res) => {
  res.json(cards);
});

module.exports = router;
