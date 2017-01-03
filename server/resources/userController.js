
var io_socket = require('../index.js');

exports.joinRoom = function(req, res){
 console.log("inside joinRoom");
 var hardRoom = io_socket.io.of('/hard');
 hardRoom.on('connection', function(socket) {
   console.log('client has just connected in '+req.params.roomID);
   socket.broadcast.emit('message', 'Another client has just connected in '+req.params.roomID);
   socket.emit("message", "connected");

   socket.on('message', function (message) {
   socket.broadcast.emit('messageReceived',message );
  }); 
 });

 var mediumRoom = io_socket.io.of('/medium');
  mediumRoom.on('connection', function(socket) {
   console.log('client has just connected in '+req.params.roomID);
   socket.broadcast.emit('message', 'Another client has just connected in '+req.params.roomID);
   socket.emit("message", "connected");
   socket.on('message', function (message) {
   socket.broadcast.emit('messageReceived',message );
  }); 
 });

 var easyRoom = io_socket.io.of('/easy');
   easyRoom.on('connection', function(socket) {
   console.log('client has just connected in '+req.params.roomID);
   socket.broadcast.emit('message', 'Another client has just connected in '+req.params.roomID);
   socket.emit("message", "connected");

   socket.on('message', function (message) {
    //socket.emit('user',socket.username);
    socket.broadcast.emit('messageReceived',message );
  }); 
 });




 

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
}
