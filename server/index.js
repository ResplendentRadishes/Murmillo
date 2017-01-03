// ===============================================
// Setup up a server

var app = require('./server.js');
//var userController = require('./resources/userController');
var port = 3000;

const server = app.listen(port, function () {
  console.log('Murmillo listening on port ' + port);
});
const io = require('socket.io')(server);
module.exports.io =io;

