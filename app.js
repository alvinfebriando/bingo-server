const express = require('express');

const app = express();

app.use('/public', express.static('./public'));

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const server = app.listen(PORT, HOST, () =>
  console.log(`Server listening on port: ${PORT}`)
);

module.exports = server;
