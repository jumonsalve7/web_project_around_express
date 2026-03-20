const Card = require('../models/card');

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

      res.status(500).send({ message: err.message });
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

      res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = likeCard;
module.exports.dislikeCard = dislikeCard;