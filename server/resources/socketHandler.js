var mochaChecker = require('../mochaChecker.js');
var syntaxChecker = require('../syntaxChecker.js');
var dbProblem = require('../db/db.js').Problem;

// create playerList (array) on the fly to avoid revealing socketID
var _createPlayerList = function(playerListForRoom) {
  var playerIDs = Object.keys( playerListForRoom );
  return playerIDs.map( function(id){
    return playerListForRoom[id];
  });
}

// ================================================
// handleJoin - broadcast users that a new users has joined to room
exports.handleJoin = function(socket, playerListForRoom) {

  socket.on('join', function (username) {
    // add user information to playerList
    playerListForRoom[socket.id] = { username: username, ready: false };

    // create playerList to send back to client (array format)
    var playerList = _createPlayerList(playerListForRoom)

    // sends to user
    socket.emit("message", 'You have joined the room');
    socket.emit("playerList", playerList);

    // sends to all other users
    socket.broadcast.emit('message', username+' has joined the room');
    socket.broadcast.emit("playerList", playerList);
  });
};
// ================================================
// handleReady configures 'handleReady' listener and 'playerList' emitter
// when user clicks on 'Ready', update user's ready status in player
exports.handleReady = function(socket, playerListForRoom) {
  // listening on 'Ready' from client
  socket.on('ready', function() {

    // get name of user who clicked 'ready'
    var userReady =  playerListForRoom[socket.id].username;

    // add user information to playerList
    playerListForRoom[socket.id].ready = true;

    // create playerList to send back to client (array format)
    var playerList = _createPlayerList(playerListForRoom)
    // inform the user regarding other's status
    var notReadyPlayers = playerList.filter(function(userObj) { return userObj.ready === false });
    var statusUpdateMsg = userReady+' is ready to start.';

    // sends to user
    socket.emit('playerList', playerList);
    socket.emit('message', statusUpdateMsg);

    // sends to all other users
    socket.broadcast.emit('playerList', playerList);
    socket.broadcast.emit('message', statusUpdateMsg);

  });
};

// ================================================
// handleLeave - broadcast users that someone has left the room
exports.handleLeave = function(socket, playerListForRoom) {

  socket.on('disconnect', function (message) {
    // get name of user who is leaving the room
    var userLeaving =  playerListForRoom[socket.id].username;

    // remove user who is leaving
    delete playerListForRoom[socket.id];

    // create playerList to send back to client (array format)
    var playerList = _createPlayerList(playerListForRoom)

    // sends to all other users
    socket.broadcast.emit('message', userLeaving + ' has left the room');
    socket.broadcast.emit("playerList", playerList);

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

  // listening on 'problem' from client
  socket.on('problem', function(problemID) {
    // grab the probelm from database
    dbProblem.findById(problemID)
      .then(function(problem) {
        // emit 'problem' to client with problem(type: object)
        socket.emit('problem', problem.dataValues);
      })
      .catch(function(err) {
        console.error(err);
        // emit 'sendProblem' to client with problem(type: object)
        socket.emit('problem', errorProblem);
      });

  });
};

// ================================================
// handle submit solution
exports.handleSubmitSolution = function(socket) {
  // handle user's submitted solution
  socket.on('codeSubmission', function (userSolnObj) {
    console.log('handlingSubmitSoln');

    var userSoln = userSolnObj.userSoln;
    var username = userSolnObj.username;
    var probID = userSolnObj.probID;

    // 1) run syntaxChecker on userSoln file
    syntaxChecker(userSoln, username, probID, function(success, error, errorMessage) {
      if(error) {
        // console.log(error);
        socket.emit('codeSubmission', errorMessage);
      }
      if(success) {
        // 2) check user's solution against mochaTests
        console.log('running mocha checker now')
        mochaChecker(userSoln, username, probID, function(result){
          socket.emit('codeSubmission', result);
          socket.broadcast.emit('compUpdate', username+': '+result);
        });
      }

    });

  });

};

