// =============================================================
// NOTES:
// variable 'io' is defined in <script src="/socket.io/socket.io.js"></script> from HTML
// =============================================================
var socketInSession = {}; //store socketInstance in an object for later use

// =============================================================
const clickTest = function() {
// for testing button click
  console.log('clicked');
};

// =============================================================
const joinRoom = function (roomID, username, callback) {
// joinRoom - makes a http request to server and creates a socket connection to roomID
//            setup event emitters and listerners
// @ paramters:
  // roomID = 'hard', 'medium',  or 'easy'
// example usage in react: <button onClick={() => joinRoom('hard')}>Join Room</button>

  // var username = prompt("Enter name");
  var nameSpace = '/'+roomID;

  // HTTP Request to the server, server will create 'nameSapce' room if serverSocket does not exist
  $.get('/api/join'+nameSpace, function(res) {
    console.log('result of http request: ' + res);
  });

  // open clientSocket connection if it does not exist yet
  if (socketInSession[nameSpace] === undefined) {

    // establish a connection to nameSpace
    var clientSocket = io(nameSpace);
    // store clientSocket instance in an object so it can be accessed later
    socketInSession[nameSpace] = clientSocket;

    // Event Emitter (emit event to server) ------------------------------------
    // emit 'join' with username
    clientSocket.emit('join', username);

    // Event Listener (listen to event from server) -----------------------------
    // listen for 'message' event and display the message
    clientSocket.on('joinMessage', function(message) {
      callback(message);
    });

    // Event Listener (listen to event from server) -----------------------------
    // listen for 'message' event and display the message
    clientSocket.on('receiveChatMessage', function(message) {
      callback(message);
    });
  }
};

// =============================================================

const sendChatMessage = function (roomID, message) {

  var nameSpace = '/'+roomID;


  // establish a connection to nameSpace
  var clientSocket = socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'join' with username
  clientSocket.emit('sendChatMessage', message);
}

// =============================================================
const readyToStart = function (roomID, probID, callback) {
// readyToStart - get problem over socket connection
// @ paramters:
  // roomID = 'hard', 'medium',  or 'easy'
  // probID = 1, 2, or 3
// example usage in react: <button onClick={() => readyToStart('hard', 1)}>Join Room</button>

  // grab the socketHard instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'getProblem' with problemID
  clientSocket.emit('getProblem', probID);

  // Event Listener (listen to event from server) -----------------------------
  // listen for 'sendProblem' event and display the problemPromt
  clientSocket.on('sendProblem', function(problem) {
    console.log(problem);
    callback(problem);
  });

};

// =============================================================
const submitSoln = function (roomID, probID, username, userSoln) {
// submitSoln - submit user's solution over socket connection
// @ paramters: roomID = 'hard', 'medium',  or 'easy'
//              probID = 1, 2, or 3
// example usage in react: <button onClick={() =>
//  submitSoln('hard', 1, 'userA', 'var solution=....'}>SubmitSoln</button>

  console.log('submitSoln')
  // ---------------------------------------------------------------
  // assume that the problem prompt is as follows:
  // 'write a funciton 'solution' that return true';
  // 'var solution = function(){ ...........  }';
  // for now manually hardcoding the user's solution (**** fix later)
  var userSolnObj = {
    userSoln,
    username,
    probID,
  };
  // ---------------------------------------------------------------

  // grab the socketHard instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'submitSoln' with user's solution
  clientSocket.emit('submitSoln', userSolnObj);

  // Event Listener (listen to event from server) -----------------------------
  // listen for 'solutionResult' event
  clientSocket.on('solutionResult', function(result) {
    console.log(result);
  });
};

export {clickTest, joinRoom, sendChatMessage, readyToStart, submitSoln};
