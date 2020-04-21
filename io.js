const SocketIO = require('socket.io');
const server = require('./app');
const io = SocketIO(server);

let roomNum = 0;

const joinRoom = (socket, roomNum) => {
  return new Promise((resolve, reject) => {
    socket.join(`room-${roomNum}`, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const getRoomID = (rooms) => {
  return Object.values(rooms)[1];
};

const getRoomMember = (namespace, rooms) => {
  return new Promise((resolve, reject) => {
    namespace.to(rooms).clients((err, clients) => {
      if (err) {
        reject(err);
      }
      resolve(clients);
    });
  });
};

io.on('connection', async (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  const roomMembers = await getRoomMember(io, `room-${roomNum}`);

  if (roomMembers.length >= 2) {
    roomNum++;
  }

  await joinRoom(socket, roomNum);
  socket.emit('joined', { roomID: getRoomID(socket.rooms) });
});

module.exports = io;
