const { forEachKey } = require('./utils');
const console = require('./console')('SocketApp', 'bold');
const bold = console.bold;

const INIT = 'INIT';
const STATE = 'STATE';
const ACTION = 'ACTION';
const REQUEST = 'REQUEST';
const DISCONNECT = 'DISCONNECT';

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

  getState() {
    return this.state || {};
  }

  dispatch(action) {
    this.io.emit(ACTION, action);
    this.dispatchSilent(action);
  }

  dispatchSilent(action) {
    this.state = this.stateReducer(this.state, action);
  }

  servicesCall(method, ...args ) {
    forEachKey(this.services, (key, service) => {
      service[method] && service[method]( ...args );
    });
  }

  emitState(connection) {
    connection.dispatch({ type: STATE, ...this.state });
  }

  init() {
    console.info('INIT MAIN STATE');
    this.state = this.stateReducer(undefined, { type: INIT });

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
}

module.exports = {
  STATE,
  ACTION,
  REQUEST,
  DISCONNECT,
  SocketApp,
  StatefulSocketConnection
};