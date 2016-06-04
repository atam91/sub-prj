export default function socketService(socket, dispatch) {
  const handleSocketResponse = (responseEvent, successEvent, failureEvent) => {
    socket.on(responseEvent, data => {
      if (data.success && successEvent) {
        dispatch({
          type: successEvent,
          payload: data.payload
        });
      } else if (data.error) {
        if (failureEvent) {
          dispatch({
            type: failureEvent,
            payload: data.error
          });
        } else {
          throw new Error(data.error);
        }
      } else {
        console.log('unknown response', data);
      }
    });
  };

  const handleSocketEvent = (socketEvent, eventType, map) => {
    socket.on(socketEvent, data => {
      var action = {type: eventType};
      if (map) action.payload = data.payload;

      dispatch(action);
    });
  };

  const service = {
    handleSocketResponse: handleSocketResponse,
    handleSocketEvent: handleSocketEvent
  };

  return service;
}

export function generateMiddleware(actions) {
  return (socket, action) => {
    if (actions.indexOf(action.type) !== -1) {
      var data = {};
      if (action.payload) data.payload = action.payload;

      socket.emit(action.type.toLowerCase(), data);
    }
  };
}