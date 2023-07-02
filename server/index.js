const app = require('express')();
const httpServer = require('http').createServer(app);
const options = {
  /* ... */
};
const io = require('socket.io')(httpServer, options);

io.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});
io.on('connection', (socket) => {
  console.log('is work');
  socket.emit('hello', 'world');
});

// client-side
// socket.on('hello', (arg) => {
//   console.log(arg); // world
// });

httpServer.listen(3000);
