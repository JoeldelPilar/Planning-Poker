let users = []
let votingResults = []

function socket(io) {
  io.on('connection', function (socket) {
    console.log('user connected: ' + socket.id);
    socket.emit('votingResults', votingResults);

    socket.on('disconnect', function (socket) {
      console.log('user disconnected: ' + socket.id);
    });

    socket.on('newTask', (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit('updateList');
    });

    socket.on('user-join', (user) => {
      users.push(user);
      console.log(users);
      io.emit('user-join', users)
    });

    socket.on('adminJoin', () => {
      socket.emit('votingResults', votingResults);
    });

    socket.on('nextTask', (nextTask) => {
      socket.emit('displayNextTask', nextTask);
      console.log(nextTask);
    });

    socket.on('returnCurrentQuestion', (currentTask) => {
      socket.emit('returnQuestionToList', currentTask);
    });

    socket.on('adminVote', (data) => {
      const task = {
        taskDescription: data.taskDescription,
        storyPoints: data.storyPoints
      };
      votingResults.push(task);
      socket.emit('votingResults', votingResults);
    });
  });
}

module.exports = socket;