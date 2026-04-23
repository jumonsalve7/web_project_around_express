const Card = require('../models/card');

// GET /cards — obtener todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// POST /cards — crear tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// DELETE /cards/:cardId — borrar tarjeta
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// PUT /cards/:cardId/likes — dar like
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// DELETE /cards/:cardId/likes — quitar like
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
