const Api = require('./Api');
const SocketApp = require('./SocketApp');

module.exports = {
  ...Api,
  ...SocketApp
};