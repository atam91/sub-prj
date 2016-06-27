const console = require('../lib/console')('controller', 'yellow');
const bold = console.bold;

const {
  RELOAD,
  CLEAR,
  SILENT_DISPATCH
} = require('../../common/constants');

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
      socketApp.dispatch({ SILENT_DISPATCH, type: CLEAR });
      break;

    case '/do force clear':
      console.log(bold('FORCE', CLEAR));
      socketApp.dispatch({ type: CLEAR });
      break;
  };
};

module.exports = {
  setSocketApp,
  cmd
};