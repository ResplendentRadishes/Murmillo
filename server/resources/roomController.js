
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');
var hardRoomExists = false;
var mediumRoomExists = false;
var easyRoomExists = false;
exports.joinRoom = function(req, res){
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
     for(var i in clientCount){
       count++;
     }
     console.log("inside "+testLevel+" room count is ", count);
     socketHandler.handleMessage(socket, count);
   });   
 }





 

  // open socket for roomID (easy, 'medium', hard)
  // assign user to the corr


  // Get problem based on easy, medium, hard

  // emit 'start' event to the client (client should listent for 'start' and render home and start time clock)
    // send problem to the user using socket (later)
    // emit 'start' event to the client (client should render home page upon 'start' event)

    // emit 'submitSoln' event from the client (server should evaluate code)
      // 1) evalute code (create a function that reutns 'error', 'fail', 'pass')
      // 2) notify users the results
          // error - syntax error, only notify to a specific only
          // fail - broard resutls to all users int the room
          // pass - close sockets for all users with message

    // listen for 'timeout' event from the client (server should close sockets for all users with message)

  //res.end("");


