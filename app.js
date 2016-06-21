const express = require('express');
const cors = require('cors');

const console = require('./common/lib/console')('app', 'cyan');
const bold = console.bold;
console.info('starting...');

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

  console.info(`--> App server listening on port ${port}`);
  console.info(bold(`==> Browse http://localhost:${port}/`));
} else {
  console.info(`--> API server listening on port ${port}`);
  app.use(cors());
}