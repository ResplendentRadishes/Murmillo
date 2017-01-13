
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');

// ===============================================================
// socketInSession keeps track of serverSockets in session
var socketInSession = {
  // '/hard': undefined,
  // '/medium': undefined,
  // '/easy': undefined
};
var playersInSession = {
  // '/hard': undefined,
  // '/medium': undefined,
  // '/easy': undefined
};

// ===============================================================
exports.joinRoom = function(req, res) {
// joinRoom responds to GET request to 'api/join/:roomID'
// currenlty the available rooms (namespace) are 'hard, medium', 'easy'
// note: there should only be one instance of serverSocket for each namespace

  console.log('---------------------')
  console.log('responding to joinRoom')

  var roomID = req.params.roomID;
  var nameSpace = '/'+roomID;

  // open serverSocket connection if it does not exist yet
  if (socketInSession[nameSpace] === undefined) {

    // establish a connection to nameSpace
    // and store serverSocket instance in an object so it can be accessed later
    var serverSocket = io_socket.io.of(nameSpace);
    socketInSession[nameSpace] = serverSocket;

    // keep track of players
    playersInSession[nameSpace] = {};

    // configure serverSocket upon connection
    serverSocket.on('connection', function(socket) {

      // get clientCount
      var clientCount = io_socket.io.nsps[nameSpace].adapter.sids;
      var count = 0;
      for(var i in clientCount){
        console.log(i);
        count++;
      }
      console.log("inside "+roomID+" room count is ", count);

      // configure socketHandler
      socketHandler.handleJoin(socket, playersInSession[nameSpace]);
      socketHandler.handleLeave(socket, playersInSession[nameSpace]);
      socketHandler.handleReady(socket, playersInSession[nameSpace]);
      socketHandler.handleMessage(socket);
      socketHandler.handleGetProblem(socket);
      socketHandler.handleSubmitSolution(socket);
    });

    res.end('starting '+roomID+' room');
  } else {
    res.end(roomID+' already exist');
  }
}
