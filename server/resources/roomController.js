
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');

var hardRoomExists = false;
var mediumRoomExists = false;
var easyRoomExists = false;

exports.joinRoom = function(req, res){
  console.log('---------------------')
  console.log('responding to joinRoom')

 switch(req.params.roomID){
   case("Hard"):
     if(hardRoomExists === false) {
       hardRoomExists = true;
       socketConnection('hard');
     }
     break;
   case("Medium"):
     if(mediumRoomExists === false) {
       mediumRoomExists = true;
       socketConnection('medium');
     }
     break;
   case("Easy"):
     if(easyRoomExists === false) {
       easyRoomExists = true;
       socketConnection('easy');
     }
     break;
  }
}

var socketConnection = function(testLevel) {
  var room = io_socket.io.of('/'+testLevel);

  room.on('connection', function(socket) {

    var clientCount = io_socket.io.nsps['/'+testLevel].adapter.sids;
    var count = 0;

    // count clientCount
    for(var i in clientCount){
      count++;
    }
    console.log("inside "+testLevel+" room count is ", count);

    // call socketHandeler funcitons
    socketHandler.handleMessage(socket, count);
    socketHandler.handleSubmitSolution(socket);

  });
}


