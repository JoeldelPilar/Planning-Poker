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

    socket.on('user-join', (user) => {
      users.push(user);
      console.log(users);
      io.emit('user-join', users)
    });

    socket.on('nextTask', (nextTask) => {
      io.emit('displayNextTask', nextTask);
      console.log(nextTask);
    })

    socket.on('returnCurrentQuestion', (currentTask) => {
      socket.emit('returnQuestionToList', currentTask)
    })
  });
}

module.exports = socket;