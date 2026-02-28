const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const usersRouter = require('./data/users');
const cardsRouter = require('./data/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});