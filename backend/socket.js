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

    socket.on("vote", (vote) => {
      console.log("röstning" + vote);
      const voteToNumber = Number(vote);
      votes.push(voteToNumber);
      console.log("votes" + votes);

      if (votes.length > 2) {
          calculateAverage(votes, io)
      }
    });

    socket.on('returnCurrentQuestion', (currentTask) => {
      socket.emit('returnQuestionToList', currentTask)
    })
  });
}

module.exports = socket;
