const User = require('../models/user');

// GET /users — obtener todos los usuarios
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// GET /users/:userId — obtener usuario por ID
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// POST /users — crear usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

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

      return res.status(500).send({ message: 'Error del servidor' });
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
        return res.status(400).send({ message: 'Datos inválidos' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }

      return res.status(500).send({ message: 'Error del servidor' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};

