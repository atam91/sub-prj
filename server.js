var express = require('express');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var io = require('./api/socket')(server);

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`==> Server listening on port ${port}`);

if ('production' == process.env.NODE_ENV) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.use('/dist', express.static('dist'));

  console.log(`==> Browse http://localhost:${port}/`);
} else {
  app.use(cors());
}