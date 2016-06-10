const express = require('express');
const cors = require('cors');

console.log('run app.js');

const app = express();
const server = require('http').Server(app);
const socketApp = require('./server/socketApp')(server);

const port = process.env.PORT || 3000;
server.listen(port);

if ('production' == process.env.NODE_ENV) {
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
  });

  app.use('/dist', express.static('dist'));
  app.use('/static', express.static('static'));

  console.log(`--> App server listening on port ${port}`);
  console.log(`==> Browse http://localhost:${port}/`);
} else {
  console.log(`--> API server listening on port ${port}`);
  app.use(cors());
}