function socket(io) {
  io.on('connection', function (socket) {
    console.log('user connected')
  
    socket.on('disconnect', function () {
      console.log('user disconnected')
    })

    socket.on('newTask', (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit('updateList');
    });

    socket.on('nextTask', (nextTask) => {
      socket.emit('displayNextTask', nextTask);
      console.log(nextTask);
    })
  });
}

module.exports = socket;