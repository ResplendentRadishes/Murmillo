// import codeEvaluate function
var codeEvaluate = require('../codeEvaluate');

// ================================================
// handleMessage --- message from the user
exports.handleMessage = function(socket, count) {
  socket.on('message', function (message) {
    socket.emit("existingClientCount", count-1);
    //socket.in('hardRoom').emit('messageReceived', message);
  });
};

// ================================================
// handle get problem
exports.handleGetProblem = function(socket) {

};

// ================================================
// handle submit solution (Yoshi still working)
exports.handleSubmitSolution = function(socket) {
  // handle user's submitted solution
  socket.on('submitSoln', function (code) {
    console.log('handleSubmitSolution')
    console.log(code)
    console.log(socket.id)

    // emit solutionResult event with the result
    var result = 'pass';
    socket.emit('solutionResult', result);
    socket.broadcast.emit('solutionResult', result);
    // socket.to(socket.id).emit('solutionResult', 'for your eyes only');
    // socket.to(socket.id).emit('solutionResult', result);
  });

};

// ================================================
// live feed
exports.handleLiveFee = function(socket) {

};

// ================================================
// close
exports.closeSocket = function(socket) {

};

