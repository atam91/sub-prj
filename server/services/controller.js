const { date } = require('../../common/lib/utils');

const {
  RELOAD,
  CLEAR
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {

  const cmd = (connection, text) => {
    if (!connection.getUsername().startsWith('zh')) return;

    switch (text) {
      case '/do force reload':
        console.log(date(), RELOAD);
        socketApp.dispatch(RELOAD);
        break;

      case '/do clear':
        console.log(date(), CLEAR);
        socketApp.dispatch(CLEAR);
        break;
    };
  };

  return { cmd };
}