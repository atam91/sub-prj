const console = require('../../common/lib/console')('controller', 'yellow');
const bold = console.bold;

const {
  RELOAD,
  CLEAR
} = require('../../common/constants/SocketEvents');

let socketApp;
const setSocketApp = (app) => { socketApp = app; };

const cmd = (connection, text) => {
  if (!connection.getUsername().startsWith('zh')) return;

  switch (text) {
    case '/do force reload':
      console.log(bold(RELOAD));
      socketApp.dispatch({ type: RELOAD });
      break;

    case '/do clear':
      console.log(bold(CLEAR));
      socketApp.dispatch({ type: CLEAR });
      break;
  };
};

module.exports = {
  setSocketApp,
  cmd
};