const io = require('socket.io')();
const port = 3000;

io.on('connection', function(socket){});
io.listen(port);
console.log(`--> Socket.io server listening on port ${port}`);