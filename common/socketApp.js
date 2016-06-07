const SocketApp = require('./lib/SocketApp');
const {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SEND,
  LOGOUT_EVENT,
  PARTICIPANTS,
  MESSAGES,
  MESSAGE_SEND,
  MESSAGE_EVENT,
  STATE
} = require('../constants/ApiEvents');

const describeSocketRequest = (connection) => (request, response, func) => {
  var socket = connection.getSocket();

  socket.on(request, data => {
    func(
      data,
      (payload) => {
        var data = {success: true};
        if (payload) data.payload = payload;
        socket.emit(response, data);
      }, 
      (error) => {
        socket.emit(response, {error: error || true});
      }
    );
  });
};


initialGlobalState = {
  participants: [],
  messages: []
};

initialConnectionState = {
  user: {
    auth: false,
    name: '',
    error: ''
  }
};

connectionReducer = (state = initialConnectionState, { type, payload }}) => {
  switch (type) {
    case LOGIN_REQUEST:
      // need req red??    local?
      return { ...state, user: { ...state.user, error: '' } };

    case LOGIN_SUCCESS:
      const user = {
        auth: true,
        name: payload,
        error: ''
      };
      return { ...state, user: { ...state.user, ...user } };

    case LOGIN_FAILURE:
      const user = {
        auth: false,
        name: '',
        error: payload
      };
      return { ...state, user: { ...state.user, ...user } };

    case LOGOUT_EVENT:
      return initialConnectionState;

    default:
      return state;
  }
};

// LOGIN_REQUEST
// LOGIN_SUCCESS:name
// LOGIN_FAILURE:error
// LOGOUT_REQUEST
// LOGOUT_SUCCESS



const SocketApp = function(io) {
  var app = {};
  var users = {};
  const initialState = {
    participants: [],
    messages: []
  };

  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case PARTICIPANTS:
        return { ...state, participants: payload };

      default:
        return state;
    }
  };

  var state = reducer();
  const dispatch = (type, payload) => {
    io.emit(type, payload);
    state = reducer(state, { type, payload });
  };

  const participants = () => {
    dispatch(PARTICIPANTS, Object.keys(users));
  };

  const stateEvent = (connection) => {
    (connection || io).emit(STATE, state)
  }

  const loginHandler = (connection) => (data) => {
    const name = data.payload;

    if (name in users) {
      connection.dispatch(LOGIN_FAILURE, 'Имя уже используется');
    } else {
      users[name] = connection.getSocket().id;
      connection.dispatch(LOGIN_SUCCESS, name);
      participants();
    }
  };

  app.connect = (connection) => {
    stateEvent(connection);

    connection.handleRequest(LOGIN_REQUEST, loginHandler);
  };

  app.disconnect = (connection) => {
    connection.dispatch(LOGOUT_SUCCESS);
  };

  return app;
};







const Connection = function(socket, generateReducer) {
  var connection = {};

  const reducer = generateReducer();
  var state = reducer();

  connection.dispatch = (type, payload) => {
    socket.emit(type, payload);
    state = reducer(state, { type, payload });
  };

  connection.handleRequest = (type, handler) => {
    socket.on(type, handler(connection));
  };

  connection.getState = () => state;

  connection.getSocket = () => socket;

  return connection;
};


const MyCon = function(socket) {
  const connection = Connection(socket, 'myReducer');

  connection.getAuth = () => connection.getState().user.auth;
  connection.getUsername = () => connection.getState().user.name;

  return connection;
};



class SocketApp {
  constructor(io, clientDescription, serverService) {
    this.io = io;
    this.clientDescription = clientDescription;
    this.serverService = serverService;

    this.init();
  }

  initState() {
    this.state = this.serverService.reducer();
  }

  emitState(connection) {
    const socket = connection && connection.getSocket();
    (socket || this.io).emit(STATE, this.state);
  }

  dispatch(type, payload) {
    io.emit(type, payload);
    this.state = this.serverService.reducer(this.state, { type, payload });
  }

  init(io) {
    this.initState();

    io.on('connection', (socket) => {
      var connection = Connection(socket, this.clientDescription.reducer);

      this.emitState(connection);
      this.connect(connection);

      socket.on('disconnect', () => {
        this.serverService.disconnect(connection);
        delete connection;
      });
    });
  }

  connect(connection) {
    Object.keys(this.serverService.handlers).forEach((request) => {
      const hanler = this.serverService.handlers[request];
      connection.handleRequest(request, hanler);
    });
  }



}




class App extends SocketApp {

  generateReducer() { return require('./reducers/state'); }
  generateConnectionReducer() { return require('./reducers/connection'); }

  defineClientEventsList() {
    return [
      LOGIN_SUCCESS,
      LOGIN_FAILURE,
      LOGOUT_EVENT,
      PARTICIPANTS,
      MESSAGE_EVENT
    ];
  }

  defineRequestHandlers() {
    return [
      { request: LOGIN_REQUEST, handler: this.loginHandler },
      { request: LOGOUT_SEND, handler: this.logoutHandler },
      { request: MESSAGE_SEND, handler: this.messageHandler },
    ];
  }

  defineServerService() {
    var users = {};
    var messageId = 1;

    this.loginHandler = (connection) => (data) => {
      const name = data.payload;

      if (name in users) {
        connection.dispatch(LOGIN_FAILURE, 'Имя уже используется');
      } else {
        users[name] = connection.socket.id;
        connection.dispatch(LOGIN_SUCCESS, name);
        this.participants();
      }
    };

    this.logoutHandler = (connection) => () => {
      this.disconnect(connection);
      connection.dispatch(LOGOUT_EVENT);
    };

    this.participants = () => {
      this.dispatch(PARTICIPANTS, Object.keys(users));
    };

    this.messageHandler = (connection) => (data) => {
      const connectionState = connection.getState();

      if (connectionState.user.auth) {
        const message = {
          id: messageId++,
          name: connectionState.user.name,
          text: data.payload
        };

        this.dispatch(MESSAGE_EVENT, message);
      }
    };

    this.disconnect = (connection) => {
      const user = connection.getState().user;
      if (user.name) {
        delete users[user.name];
        this.participants();
      }
    };

    // почему бы не не возвращать service(getState, dispatch) = { loginHandler, logoutHandler, messageHandler }
  }
}



const service = function(getState, dispatch) {
  const service = {};
  const users = {};
  var messageId = 1;

  service.participants = () => {
    dispatch(PARTICIPANTS, Object.keys(users));
  };

  service.disconnect = (connection) => {
    delete users[connection.getUsername()];
    service.participants();
  };

  const handlers = {
    LOGIN_REQUEST:
      (connection) => (name) => {
        if (name in users) {
          connection.dispatch(LOGIN_FAILURE, 'Имя уже используется');
        } else {
          users[name] = connection.socket.id;
          connection.dispatch(LOGIN_SUCCESS, name);
          service.participants();
        }
      },

    LOGOUT_SEND:
      (connection) => () => {
        service.disconnect(connection);
        connection.dispatch(LOGOUT_EVENT);
      },

    MESSAGE_SEND:
      (connection) => (text) => {
        dispatch(MESSAGE_EVENT, {
          id: messageId++,
          name: connection.getUsername(),
          text
        });
      }
  };

  return { ...service, handlers };
};