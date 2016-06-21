const console = require('./console')('SocketApp', 'bold');
const bold = console.bold;
const {
  forEachKey,
  objectFilterKey,
  notFilter
} = require('../../common/utils');
const {
  INIT,
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT,
  SILENT_DISPATCH
} = require('../../common/constants')

const Store = (reducer, ...listeners) => {
  let state;

  const getState = () => state || {};

  const dispatch = (action) => {
    if (action[SILENT_DISPATCH]) {
      action = objectFilterKey(action, notFilter(SILENT_DISPATCH));
    } else {
      listeners && listeners.forEach(l => l(action));
    }
    state = reducer(state, action);
  };

  dispatch({ SILENT_DISPATCH, type: INIT });

  return { dispatch, getState };
};

const StatefulSocketConnection = function(socket, reducer) {
  const sendAction = (action) => {
    socket.emit(ACTION, action)
  };
  const getSocket = () => socket;

  const store = Store(reducer, sendAction);

  return {
    getSocket,
    sendAction,
    dispatch: store.dispatch,
    getState: store.getState
  };
};

class SocketApp {
  constructor(io, Connection, services, reducer, ...listeners) {
    this.io = io;
    this.Connection = Connection;
    this.services = services;

    console.info('INIT MAIN STATE');
    const store = Store(reducer, ::this.sendAction, ...listeners);
    this.dispatch = store.dispatch;
    this.getState = store.getState;

    this.servicesCall('setSocketApp', this);
    this.init();
  }

  servicesCall(method, ...args ) {
    forEachKey(this.services, (key, service) => {
      service[method] && service[method]( ...args );
    });
  }

  init() {
    let online = 0;
    this.online = {
      inc: (id) => {
        online++;
        console.log(`(+ #${id})`, 'ONLINE:', bold(online));
      },
      dec: (id) => {
        online--;
        console.log(`(- #${id})`, 'ONLINE:', bold(online));
      }
    };

    let index = 0;
    this.io.on('connection', (socket) => this.connect(socket, index++));
  }

  connect(socket, id) {
    const connection = this.Connection(socket);
    this.online.inc(id);

    this.emitState(connection);
    this.servicesCall('connect', connection);

    socket.on(REQUEST, (action) => {
      this.servicesCall('handler', connection, action);
    });

    socket.on('error', (e) => {
      console.error('SOCKET ERROR:', e);
    });

    socket.on('disconnect', () => {
      this.servicesCall('disconnect', connection);
      socket.emit(DISCONNECT);
      this.online.dec(id);
    });
  }

  emitState(connection) {
    connection.dispatch({ type: STATE, ...this.getState() });
  }

  sendAction(action) {
    this.io.emit(ACTION, action);
  }
}

module.exports = {
  Store,
  SocketApp,
  StatefulSocketConnection
};