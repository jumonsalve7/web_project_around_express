const User = require('../models/user');

// PATCH /users/me — actualizar perfil
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }

      res.status(500).send({ message: err.message });
    });
};

// PATCH /users/me/avatar — actualizar avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'URL inválida' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports.updateProfile = updateProfile;
module.exports.updateAvatar = updateAvatar;