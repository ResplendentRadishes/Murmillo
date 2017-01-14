
var io_socket = require('../index.js');
var socketHandler = require('./socketHandler');

// ===============================================================
// socketInSession keeps track of serverSockets in session
var socketInSession = {
  // '/hard': socketInstance,
  // '/medium': undefined,
  // '/easy': undefined
};
// playersInSession keeps track of players in session
var playersInSession = {
  // '/hard': {'/hard#jdoja': {username: 'username', ready: false},.....},
  // '/medium': undefined,
  // '/easy': undefined
};
// gameInSession keeps track of games going on in session
var gameInSession = {
  // '/hard': { problem: {id: 1, prompt: .......}},
  // '/medium': undefined,
  // '/easy': undefined
};
// resetNameSpace will be passed down to handleLeave for reseting objects above
// function will remove the socket for nameSpace and reset objects above
var resetNamespace = function(io_socket, socketInSession, playersInSession, gameInSession) {
  return function(nameSpace) {
    console.log('---------------------')
    console.log('closing socket'+nameSpace);

    // close namespace socket
    // reference: http://stackoverflow.com/questions/26400595/socket-io-how-do-i-remove-a-namespace
    socketInSession[nameSpace].removeAllListeners(); // Remove all Listeners
    delete io_socket.io.nsps[nameSpace] // delete namesapce

    // delete socket, player, and game information
    delete socketInSession[nameSpace];
    delete playersInSession[nameSpace];
    delete gameInSession[nameSpace];
  }
}(io_socket, socketInSession, playersInSession, gameInSession);

// ===============================================================
exports.joinRoom = function(req, res) {
// joinRoom responds to GET request to 'api/join/:roomID'
// currenlty the available rooms (namespace) are 'hard, medium', 'easy'
// note: there should only be one instance of serverSocket for each namespace

  var roomID = req.params.roomID;
  var nameSpace = '/'+roomID;

  console.log('---------------------')
  console.log("responding to client's request to join: "+nameSpace);

  // open serverSocket connection if it does not exist yet
  if (socketInSession[nameSpace] === undefined) {

    // establish a connection to nameSpace
    // and store serverSocket instance in an object so it can be accessed later
    var serverSocket = io_socket.io.of(nameSpace);
    socketInSession[nameSpace] = serverSocket;

    // keep track of players and games in session
    playersInSession[nameSpace] = {};
    gameInSession[nameSpace] = {};

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
      socketHandler.handleLeave(socket, playersInSession[nameSpace], nameSpace, resetNamespace);
      socketHandler.handleReady(socket, playersInSession[nameSpace]);
      socketHandler.handleMessage(socket);
      socketHandler.handleGetProblem(socket, gameInSession[nameSpace]);
      socketHandler.handleSubmitSolution(socket);
    });

    res.end('starting '+roomID+' room');
  } else {
    res.end(roomID+' already exist');
  }
}
