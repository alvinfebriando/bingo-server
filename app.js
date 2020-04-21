const express = require('express');

const app = express();

app.use('/public', express.static('./public'));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}`)
);

module.exports = server;
