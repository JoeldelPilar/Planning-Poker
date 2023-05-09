let users = [];
let votes = [];

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

    socket.on('vote', (data) => {
      console.log(data.storyPoints);
      votes.push(data.storyPoints);
      const average = votes.reduce((acc, curr) => acc + curr, 0) / votes.length;
      console.log("medeltal till frontend" + average);
      io.emit('average', average);
    })

  });
}

module.exports = socket;