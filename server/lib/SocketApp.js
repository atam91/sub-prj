const { forEachKey } = require('../../common/utils');
const console = require('./console')('SocketApp', 'bold');
const bold = console.bold;

const {
  INIT,
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT
} = require('../../common/constants')

const StatefulSocketConnection = function(socket, reducer) {
  let state = reducer(undefined, {});

  const getState = () => state;
  const getSocket = () => socket;

  const dispatch = (action) => {
    socket.emit(ACTION, action);
    state = reducer(state, action);
  };

  return {
    dispatch,
    getState,
    getSocket
  };
};

class SocketApp {
  constructor(io, stateReducer, services, Connection) {
    this.io = io;
    this.stateReducer = stateReducer;
    this.services = services;
    this.Connection = Connection;
    this.listeners = [];

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

    this.servicesCall('setSocketApp', this);
    this.init();
  }

  init() {
    console.info('INIT MAIN STATE');
    this.state = this.stateReducer(undefined, { type: INIT });

    let index = 0;
    this.io.on('connection', (socket) => this.connect(socket, index++));
  }

  servicesCall(method, ...args ) {
    forEachKey(this.services, (key, service) => {
      service[method] && service[method]( ...args );
    });
  }

  getState() {
    return this.state || {};
  }

  subscribeToDispatch(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  dispatch(action) {
    this.io.emit(ACTION, action);
    this.listeners.forEach(listener => listener(action));
    this.dispatchSilent(action);
  }

  dispatchSilent(action) {
    this.state = this.stateReducer(this.state, action);
  }

  emitState(connection) {
    connection.dispatch({ type: STATE, ...this.state });
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
}

module.exports = {
  SocketApp,
  StatefulSocketConnection
};