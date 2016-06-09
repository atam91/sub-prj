const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const config = require('./webpack.config.dev');

const port = 3333;
const app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.use('/static', express.static('static'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("--> Dev server listening on port %s.", port);
    console.info("==> Browse http://localhost:%s/", port);
  }
});