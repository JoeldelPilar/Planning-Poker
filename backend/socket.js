let users = []

function socket(io) {
  io.on('connection', function (socket) {
    console.log('user connected: ' + socket.id);

    socket.on('disconnect', function (socket) {
      console.log('user disconnected: ' + socket.id)
    })

    socket.on('newTask', (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit('updateList');
    });

    socket.on('user-join', (userName) => {
      users.push(userName);
      console.log(`user joined: ${userName}`);
      io.emit('user-join', users)
    });


    socket.on('nextTask', (nextTask) => {
      socket.emit('displayNextTask', nextTask);
      console.log(nextTask);
    })

  });
}

module.exports = socket;