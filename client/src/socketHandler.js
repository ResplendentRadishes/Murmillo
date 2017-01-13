// =============================================================
// NOTES:
// variable 'io' is defined in <script src="/socket.io/socket.io.js"></script> from HTML
// =============================================================
//store socketInstance in an object for later use
var socketInSession = {
  '/hard': undefined,
  '/medium': undefined,
  '/easy': undefined
};

// =============================================================
const socketEmitJoin = function (roomID, username) {
  var nameSpace = '/'+roomID;

  // HTTP Request to the server, server will create 'nameSapce' if it does not exist
  $.get('/api/join'+nameSpace, function(res) {
    console.log('result of http request: ' + res);
  });

  // open clientSocket connection if it does not exist yet
  if (socketInSession[nameSpace] === undefined) {
    // establish a connection to nameSpace
    var clientSocket = io(nameSpace);
    // store clientSocket instance in object so it can be accessed later
    socketInSession[nameSpace] = clientSocket;
    // emit 'join' with username
    clientSocket.emit('join', username);
  }
};

// =============================================================
const socketClosePrevRoom = function(prevRoom) {
  var nameSpace = '/'+prevRoom.name;

  if (socketInSession[nameSpace] !== undefined) {
    console.log('closing socket for '+prevRoom.name)
    // grab the socket instance stored in object
    var clientSocket = socketInSession[nameSpace];
    // disconnect clientSocket
    clientSocket.disconnect();
    // remove nameSpace from socketInSession object
    delete socketInSession[nameSpace]
  };
};


// =============================================================
const socketOnMsg = function (roomID, callback) {
  // grab the socket instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket = socketInSession[nameSpace];

  // listen for 'message' event from server and get message via callback
  clientSocket.on('message', function(message) {
    callback(message);
  });
};
const socketEmitMsg = function (roomID, username, message) {
  // grab the socket instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket = socketInSession[nameSpace];

  // format data to send to server
  var userMsg = username.split(' ')[0]+': '+message;

  // emit 'message' event to server
  clientSocket.emit('message', userMsg);
};

// =============================================================
const socketOnProblem = function (roomID, callback) {
  // grab the socket instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // listen for 'problem' event from server and get problem via callback
  clientSocket.on('problem', function(problem) {
    callback(problem);
  });
};
const socketEmitProblem = function (roomID, probID) {
  // grab the socket instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // emit 'problem' to serer with problemID
  clientSocket.emit('problem', probID);
};

// =============================================================
const socketOnSubmission = function (roomID, callback) {
  // grab the socketHard instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // listen for 'codeSubmission' event from server and get problem via callback
  clientSocket.on('codeSubmission', function(result) {
    callback(result);
  });

};
const socketEmitSubmission = function (roomID, probID, username, userSoln, handleResult) {
  // grab the socketHard instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // format data to send to server
  var userSolnObj = {
    userSoln,
    username,
    probID,
  };

  // emit 'codeSubmission' with user's solution
  clientSocket.emit('codeSubmission', userSolnObj);
};

// =============================================================
const socketOnUpdate = function (roomID, callback) {
  // grab the socket instance stored in object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // listen for 'compUpdate' event and get update via callback
  clientSocket.on('compUpdate', function(update) {
    callback(update);
  });
};

// =============================================================
export {
  socketEmitJoin,
  socketClosePrevRoom,
  socketOnMsg,
  socketEmitMsg,
  socketOnProblem,
  socketEmitProblem,
  socketOnSubmission,
  socketEmitSubmission,
  socketOnUpdate
};


