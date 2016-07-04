const Api = require('./Api');
const App = require('./App');
const SocketApp = require('./SocketApp');
const UI = require('./UI');

module.exports = {
  ...Api,
  ...App,
  ...SocketApp,
  ...UI
};