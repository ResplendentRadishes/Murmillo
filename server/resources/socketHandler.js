var mochaChecker = require('../mochaChecker.js');
var syntaxChecker = require('../syntaxChecker.js');

// ================================================
// handleMessage --- ?????
exports.handleMessage = function(socket, count) {
  socket.on('message', function (message) {
    socket.emit("existingClientCount", count-1);
    //socket.in('hardRoom').emit('messageReceived', message);
  });
};

// ================================================
// handleJoin - broadcast users that a new users has joined to room
exports.handleJoin = function(socket, count) {
  socket.on('join', function (username) {
    socket.emit("joinMessage", 'you have joined the room');                 // private message
    socket.broadcast.emit('joinMessage', username+' has joined the room');  // all except user
  });
};

// ================================================
// handle getProblem - provide user a problem prompt
var fakeProblem = {
  1: 'write function that returns false',
  2: 'write function that returns false'
};
exports.handleGetProblem = function(socket) {
  socket.on('getProblem', function(problemID) {
    socket.emit('sendProblem', fakeProblem[problemID]);
  });
};

// ================================================
// handle submit solution
exports.handleSubmitSolution = function(socket) {
  // handle user's submitted solution
  socket.on('submitSoln', function (userSolnObj) {
    console.log('handlingSubmitSoln');

    var userSoln = userSolnObj.userSoln;
    var username = userSolnObj.username;
    var probID = userSolnObj.probID;

    // 1) run syntaxChecker on userSoln file
    syntaxChecker(userSoln, username, probID, function(success, error) {
      if(error) {
        // console.log(error);
        socket.emit('solutionResult', 'you have syntax error');
      }
      if(success) {
        // 2) check user's solution against mochaTests
        console.log('running mocha checker now')
        mochaChecker(userSoln, username, probID, function(result){
          // emit solutionResult event with the result
          socket.emit('solutionResult', result);
          socket.broadcast.emit('solutionResult', result);
        });
      }

    });

  });

};

// ================================================
// live feed
exports.handleLiveFee = function(socket) {

};

// ================================================
// close
exports.closeSocket = function(socket) {

};

