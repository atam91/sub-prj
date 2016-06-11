const { date } = require('../../common/lib/utils');

const {
  RELOAD
} = require('../../common/constants/SocketEvents');

module.exports = function(socketApp) {

  const cmd = (connection, text) => {
    if (connection.getUsername() != 'zh') return;

    switch (text) {
      case '/do force reload':
        console.log(date(), RELOAD);
        socketApp.dispatch(RELOAD);
    };
  };

  const handlers = {};

  return { handlers, cmd };
}