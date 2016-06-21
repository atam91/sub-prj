const events = require('./events');
const SocketApp = require('./SocketApp');

module.exports = {
  ...events,
  ...SocketApp
};