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
      socket.emit("displayNextTask", nextTask);
      console.log(nextTask);
    });

    socket.on("vote", (data) => {
      console.log(data.storyPoints);
      votes.push(data.storyPoints);
      console.log("votes" + votes);

      if (votes.length > 2) {
          calculateAverage(votes, io)
      }
    });

  });
}

module.exports = socket;
