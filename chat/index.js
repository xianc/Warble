
// Server-side support for chat app:
exports.init = function (socket) {
  socket.on('post', function (data) {
    console.log('Received post: ' + JSON.stringify(data));
    socket.broadcast.emit('post', data);
  });
};
