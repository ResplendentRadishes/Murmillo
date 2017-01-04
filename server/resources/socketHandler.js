// handleMessage --- message from the user
exports.handleMessage = function(socket, count) {
  socket.on('message', function (message) {
       socket.emit("existingClientCount", count-1);
       //socket.in('hardRoom').emit('messageReceived',message);
     }); 
}
//handle get problem
// handle submit solution
//live feed 
//close 

