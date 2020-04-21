const socket = io();

socket.on('joined', (data) => {
  console.log(data);
});
