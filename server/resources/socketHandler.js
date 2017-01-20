var dbProblem = require('../db/problem.js');
var Axios = require('axios');

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
// when user clicks on 'Ready', update user's ready status in playerListForRoom
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
exports.handleLeave = function(socket, playerListForRoom, nameSpace, resetNamespace) {

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

    // when all users have left, close socket and reset game, player, and socket
    if (playerList.length === 0) {
      resetNamespace(nameSpace);
    }

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
// handleGetProblem configures 'problem' listener and 'problem' emitter
exports.handleGetProblem = function(socket, gameInfoForRoom) {
  // use errorProblem when problem cannto be found
  var errorProblem = {title: 'error', prompt: 'error', template: 'error'};

  // listening on 'problem' from client
  socket.on('problem', function(problemID) {

    if ( gameInfoForRoom.problem === undefined ) {
      // if gameInfoForRoom is not available, grab the probelm from database
      // this way, we dont need to query the DB for the same problem
      dbProblem.findById(problemID)
        .then(function(problemDB) {
          // save problem from DB to gameInfoForRoom for later access
          gameInfoForRoom.problem = problemDB.dataValues
          // add a date stamp for the problem (used to start time on client side)
          gameInfoForRoom.problem.dateStamp = new Date();
          // emit 'sendProblem' to client with problem(type: object)
          setTimeout(function(){
            socket.emit('problem', gameInfoForRoom.problem);
          }, 1000)

        })
        .catch(function(err) {
          // assign errorProblem to gameInfoForRoom
          gameInfoForRoom.problem = errorProblem;
          // emit 'problem' to client with problem(type: object)
          socket.emit('problem', gameInfoForRoom.problem);
          console.error(err);
        });

    } else {
      // if gameInfoForRoom exists, grab the probelm from memory
          setTimeout(function(){
            socket.emit('problem', gameInfoForRoom.problem);
          }, 1000)
    }

  });

};

// ================================================
// handle submit solution
// exports.handleSubmitSolution = function(socket) {
//   // handle user's submitted solution
//   socket.on('codeSubmission', function (userSolnObj) {
//     console.log('handlingSubmitSoln');
//
//     var userSoln = userSolnObj.userSoln;
//     var username = userSolnObj.username;
//     var probID = userSolnObj.probID;
//
//     // 1) run syntaxChecker on userSoln file
//     syntaxChecker(userSoln, username, probID, function(success, error, errorMessage) {
//       if(error) {
//         // console.log(error);
//         socket.emit('codeSubmission', errorMessage);
//       }
//       if(success) {
//         // 2) check user's solution against mochaTests
//         console.log('running mocha checker now')
//         mochaChecker(userSoln, username, probID, function(result){
//           socket.emit('codeSubmission', result);
//           socket.broadcast.emit('compUpdate', username+': '+result);
//         });
//       }
//
//     });
//
//   });
//
// };

var allPassing = function (str) {
  // str = '0 out of 3 passing.';  // match = [ '0', '3' ];
  var myReg = /\d/g;
  var match = str.match(myReg);
  if(match !== null && match[0] === match[1]) { return true; }
  return false;
};

//sends the code to a docker container to sandbox
exports.handleSubmitSolution = function(socket, gameInfoForRoom) {
  // handle user's submitted solution

  // AWS server:    '54.202.48.170:8510'
  // Digital Ocean: '162.243.153.240:8510';
  // docker-compose container: 'codeserver:8510'
  var codecheckAPI = 'codeserver:8510';

  socket.on('codeSubmission', function (userSolnObj) {
    var userSoln = userSolnObj.userSoln;
    var username = userSolnObj.username;
    var probID = userSolnObj.probID;

    var destination = 'http://' + codecheckAPI + '/test/' + probID;

    //send a post request to the port used by our docker container
    Axios.post(destination, {code: userSoln})
      .then(function(response){

        let result = response.data;
        var now = new Date();
        var timeElapsed = (now - gameInfoForRoom.problem.dateStamp)/1000; //second
        var timeLimit = gameInfoForRoom.problem.timelimit; //second
        var inTime = (timeLimit-timeElapsed) > 0 ? true : false;

        if (inTime) {
          socket.emit('codeSubmission', {
            allPassing: allPassing(result),     //boolean
            resultMsg: 'Your Result: '+result   //string
          });
          socket.broadcast.emit('compUpdate', username+': '+result);

          // if correct soln, update user's score
          if ( allPassing(result) ) {
            socket.emit('scoreUpdate', {
              winner: true,                          //boolean
              score: 5,                              //number
              problemId: gameInfoForRoom.problem.id, //number
            });
          }

        } else {
          socket.emit('codeSubmission', {
            allPassing: allPassing(result),     //boolean
            resultMsg: 'Your Result: '+result   //string
          });
        }
      })
      .catch(function(error){
        console.log('error is ', error);
      });
  });
};
