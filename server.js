var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(port);
console.log(`--> Socket.io server listening on port ${port}`);

if ('production' == process.env.NODE_ENV) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.use('/dist', express.static('dist'));

  console.log(`==> Browse http://localhost:${port}`);
}