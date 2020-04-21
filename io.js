const SocketIO = require('socket.io');
const server = require('./app');
const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log(`A user connected, id: ${socket.id}`);
});

module.exports = io;
