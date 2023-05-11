const calculateAverage = require("./utils/votes");

let users = []; // {id: socket.id, name: username, storyPoints: ''}
let votes = [];
let votingResults = []

function socket(io) {
  io.on("connection", function (socket) {
    console.log("user connected: " + socket.id);
    socket.emit('votingResults', votingResults);
    io.emit('user-join', users);

    socket.on('disconnect', function () {
      console.log('user disconnected: ' + socket.id)
      const userDisconnecting = users.find(user => user.id === socket.id)
      if (userDisconnecting) {
        const userIndex = users.findIndex(user => user.id === socket.id)
        users.splice(userIndex, 1)
        console.log(users)
        //Send back updated users-list to connected clients.
        io.emit('user-join', users)
      }
    });

    socket.on("newTask", (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit("updateList");
    });

    socket.on('user-join', (user) => {
      user.id = socket.id;
      users.push(user);
      console.log(users);
      io.emit('user-join', users)
    });

    socket.on('adminJoin', () => {
      socket.emit('votingResults', votingResults);
      io.emit('user-join', users);
    });

    socket.on("nextTask", (nextTask) => {
      io.emit("displayNextTask", nextTask);
      console.log(nextTask);
      votes = [];
      io.emit('clearResult');
    });

    socket.on("vote", (data) => {
      console.log("användare" + data.user);
      console.log("tal" + data.vote);
      let voteToNumber;
      const user = users.find((user) => user.name === data.user);
      socket.emit("disableBtn")

      if (user) {
        user.storyPoints = data.vote;
        console.log(users);
        io.emit('user-join', users)
      }

      if (data.vote === "?") {
        voteToNumber = "?";
      } else {
        voteToNumber = Number(data.vote)
      }

      votes.push(voteToNumber);

      if (votes.length === users.length) {
        const accurateVotes = votes.filter(vote => vote !== "?");
        console.log("giltiga röster" + accurateVotes);
        console.log(("users" + users));
        calculateAverage(accurateVotes, io)
      }
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
      io.emit('votingResults', votingResults);
    });

    socket.on('clearVotingResults', () => {
      votingResults = []
      socket.emit('votingResults', votingResults);
      socket.emit('clearNewTasks');
      io.emit('redirectToStartingpage', '/');
    });
  });
}

module.exports = socket;