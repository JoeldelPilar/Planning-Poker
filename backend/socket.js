const calculateAverage = require("./utils/votes");

let users = [];
let votes = [];

function socket(io) {
  io.on("connection", function (socket) {
    console.log("user connected: " + socket.id);

    socket.on("disconnect", function (socket) {
      console.log("user disconnected: " + socket.id);
    });

    socket.on("newTask", (newTaskDescription) => {
      console.log(`New task: ${newTaskDescription}`);
      socket.emit("updateList");
    });

    socket.on('user-join', (user) => {
      users.push(user);
      console.log(users);
      io.emit('user-join', users)
    });

    socket.on("nextTask", (nextTask) => {
      io.emit("displayNextTask", nextTask);
      console.log(nextTask);
    });

    socket.on("vote", (data) => {
      console.log("användare" + data.user);
      console.log("tal" + data.vote);

      const voteToNumber = Number(data.vote);
      votes.push(voteToNumber);

      const user = users.find((user) => user.name === data.user);
      if (user) {
        user.storyPoints = data.vote;
        console.log(users);
      }

      const usersThatVoted = users.filter(user => user.storyPoints !== "");
      console.log(usersThatVoted);

      if (votes.length === usersThatVoted.length) {
          calculateAverage(votes, io)
      }
    });

    socket.on('returnCurrentQuestion', (currentTask) => {
      socket.emit('returnQuestionToList', currentTask)
    })
  });
}

module.exports = socket;
