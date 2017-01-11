
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');

// ===============================================================
// socketInSession keeps track of serverSockets in session
var socketInSession = {
  '/hard': undefined,
  '/medium': undefined,
  '/easy': undefined
};
// playerInSession keeps track of players in each namespace
var playerInSession = {
  '/hard': {},
  '/medium': {},
  '/easy': {}
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
    var serverSocket = io_socket.io.of(nameSpace);

    // store serverSocket instance in an object so it can be accessed later
    socketInSession[nameSpace] = serverSocket;

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
      socketHandler.handleJoin(socket, roomID, playerInSession);
      socketHandler.handleLeave(socket, roomID, playerInSession);
      socketHandler.handleMessage(socket);
      socketHandler.handleGetProblem(socket);
      socketHandler.handleSubmitSolution(socket);
    });

    res.end('starting '+roomID+' room');
  } else {
    res.end(roomID+' already exist');
  }
}
