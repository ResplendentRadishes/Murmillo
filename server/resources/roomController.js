
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');

var hardRoomExists = false;
var mediumRoomExists = false;
var easyRoomExists = false;

// ===============================================================
exports.joinRoom = function(req, res) {
// joinRoom responds to GET request to 'api/join/:roomID'
// currenlty the available rooms (namespace) are 'hard, medium', 'easy'
// note: there should only be one instance of serverSocket for each namespace

  console.log('---------------------')
  console.log('responding to joinRoom')

 switch(req.params.roomID){
   case("hard"):
     if(hardRoomExists === false) {
       hardRoomExists = true;
       socketConnection('hard');
      res.end('starting hard room');
     }
     break;
   case("medium"):
     if(mediumRoomExists === false) {
       mediumRoomExists = true;
       socketConnection('medium');
      res.end('starting medium room');
     }
     break;
   case("easy"):
     if(easyRoomExists === false) {
       easyRoomExists = true;
       socketConnection('easy');
      res.end('starting easy room');
     }
     break;
    default:
      res.end('room you tried to reach does not exist');
  }
  res.end('room exists');
}

// ===============================================================
var socketConnection = function(testLevel) {
// socketConnection function opens serverSocket for provided 'testLevel'
// and configures event emitters and listeners
// @ paratemers:
  // testLevel - string ('hard, medium', 'easy');

  // 1) grab the test cases from the 'codeChcker' folder based on probID
  // var testFileUrl = './codeChecker/test' + probID + '.js';
  var room = io_socket.io.of('/'+testLevel);

  room.on('connection', function(socket) {

    var clientCount = io_socket.io.nsps['/'+testLevel].adapter.sids;
    var count = 0;

    // count clientCount
    for(var i in clientCount){
      console.log(i);
      count++;
    }
    console.log("inside "+testLevel+" room count is ", count);

    socket.on('disconnect', function() { console.log('a user has left the room'); });

    // set other socketHandeler
    socketHandler.handleJoin(socket);
    socketHandler.handleChatMessage(socket);
    socketHandler.handleGetProblem(socket);
    socketHandler.handleSubmitSolution(socket);

  });
}


