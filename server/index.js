const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send("Hello!");
});

io.of(/^\/chat-\d+$/).on('connection', (socket) => {
  const newNamespace = socket.nsp;
  console.log('a user connected('+newNamespace.name+')');
  socket.on('disconnect', () => {
    console.log('user disconnected('+newNamespace.name+')');
  });
  socket.on('chat message', (msg) => {
    newNamespace.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});