var mochaChecker = require('../mochaChecker.js');
var syntaxChecker = require('../syntaxChecker.js');
var dbProblem = require('../db/db.js').Problem;

// ================================================
// handleJoin - broadcast users that a new users has joined to room
exports.handleJoin = function(socket, roomID, playerInSession) {
  socket.on('join', function (username) {
    // store username in playerInSession
    playerInSession['/'+roomID][socket.id] = username;

    // sends to user
    socket.emit("message", 'You have joined '+roomID+' room');
    // sends to all other users
    socket.broadcast.emit('message', username+' has joined the room');
  });
};
// ================================================
// handleLeave - broadcast users that someone has left the room
exports.handleLeave = function(socket, roomID, playerInSession) {
  socket.on('disconnect', function (message) {
    // get name of user who is leaving the room
    var userLeaving =  playerInSession['/'+roomID][socket.id];

    // remove user who is leaving
    delete playerInSession['/'+roomID][socket.id];

    // sends to all other users
    socket.broadcast.emit('message', userLeaving + ' has left the room');
  });
};

// ================================================
// handleChatMessage - broadcast messages to everyone within room
exports.handleMessage = function(socket) {
  socket.on('message', function (message) {
    // sends to user
    socket.emit("message", message);
    // sends to all other users
    socket.broadcast.emit('message', message);
  });
};

// ================================================
// handleGetProblem configures 'getPrblem' listener and 'sendProblem' emitter
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
    syntaxChecker(userSoln, username, probID, function(success, error, errorMessage) {
      if(error) {
        // console.log(error);
        socket.emit('solutionResult', errorMessage);
      }
      if(success) {
        // 2) check user's solution against mochaTests
        console.log('running mocha checker now')
        mochaChecker(userSoln, username, probID, function(result){
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

