// ===============================================
// Setup up a server

var app = require('./server.js');
var port = 3000;

app.listen(port, function () {
  console.log('Murmillo listening on port ' + port);
});
