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

module.exports.describeSocketRequest = describeSocketRequest;