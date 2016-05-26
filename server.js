var express = require('express');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(cors());
app.listen(port);
console.log(`--> Socket.io server listening on port ${port}`);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



if ('production' == process.env.NODE_ENV) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.use('/dist', express.static('dist'));

  console.log(`==> Browse http://localhost:${port}/`);
}

var counter = 0;

app.get('/counter', function (req, res) {
  res.send(JSON.stringify(++counter));
});

app.get('/null', function (req, res) {
  counter = 0;
  res.send(JSON.stringify(counter));
});