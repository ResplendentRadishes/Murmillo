var mochaChecker = require('../mochaChecker.js');
var syntaxChecker = require('../syntaxChecker.js');
var dbProblem = require('../db/db.js').Problem;

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
    socket.emit("joinMessage", 'You have joined the room');                 // private message
    socket.broadcast.emit('joinMessage', username+' has joined the room');  // all except user
  });
};

// ================================================
// handleChatMessage - broadcast messages to everyone within room
exports.handleChatMessage = function(socket) {
  socket.on('sendChatMessage', function (message) {
    socket.emit("receiveChatMessage", message);                 // sends to user
    socket.broadcast.emit('receiveChatMessage', message);  // sends to all other users
  });
};

// ================================================
// handleGetProblem configures 'getPrblem' listener and 'sendProblem' emitter
var fakeProblem = {
  1: 'write function that returns false',
  2: 'write function that returns false'
};

exports.handleGetProblem = function(socket) {
  // use errorProblem when problem cannto be found
  var errorProblem = {title: 'error', prompt: 'error', template: 'error'};

  // listening on 'getProblem' from client
  socket.on('getProblem', function(problemID) {
    // grab the probelm from database
    dbProblem.findById(problemID)
      .then(function(problem) {
        // emit 'sendProblem' to client with problem(type: object)
        socket.emit('sendProblem', problem.dataValues);
      })
      .catch(function(err) {
        console.error(err);
        // emit 'sendProblem' to client with problem(type: object)
        socket.emit('sendProblem', errorProblem);
      });

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

