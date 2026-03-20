const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

app.use((req, res, next) => {
  req.user = {
    _id: '69bd5d45a8fa7e6df902c0b8',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

module.exports.createCard = (req, res) => {
  console.log(req.user._id); 
};