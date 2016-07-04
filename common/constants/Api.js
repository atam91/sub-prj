const define = require('./define')(module.exports);

// LOGIN, LOGOUT
define('LOGIN_REQUEST');
define('LOGIN_SUCCESS');
define('LOGIN_FAILURE');

define('LOGOUT_SEND');
define('LOGOUT_EVENT');
define('PARTICIPANTS');

// CHAT
define('SEND');
define('GET');
define('GET_DATA');

define('PRIVATE');
define('MESSAGE');

define('CLEAR');
define('RELOAD');

// GAME
define('GAME');
define('GAME_DATA');
define('GAME_START');

define('GAME_WATCH');
define('WATCH_GAME');
define('GAME_STATE');

define('GAME_JOIN');
define('JOIN_GAME');
define('GAME_LEAVE');

define('GAME_MOVE');
define('GAME_RESTART');