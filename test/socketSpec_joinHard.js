var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================

describe("Server Socket Response: 3 users join 'hard' room", function () {
  // ===================================================================
  // Start all rooms ('hard', 'medium', 'easy')

  // assign url to request
  request = request('http://localhost:3000');

  var clientSocket1;  var clientMessage1 = [];
  var clientSocket2;  var clientMessage2 = [];
  var clientSocket3;  var clientMessage3 = [];

  // ===================================================================
  // use beforeEach block to establish server socket connection
  // test connection on 'hard', 'medium', 'easy'
  beforeEach(function (done) {
    // start serverSocket for 'hard' by calling /api/join/:hard
    request
      .get('/api/join/hard')
      .expect(200)
      .end(function(err, res){
        console.log('   ===logging response from server: '+res.text);
        done()
      });
  });

  // ===================================================================
  it('serverSocket should respond with a message upon joining "hard" namespace: 3 client', function(done) {

    // client 1 ------------------------------------------------
    var nameSpace1 = '/hard';

    // establish a connection to nameSpace
    clientSocket1 = io('http://localhost:3000'+nameSpace1);

    clientSocket1.emit('join', 'client 1');

    clientSocket1.on('message', function(message){
      clientMessage1.push(message);
      expect(message).to.be.a('string');
    });

    // client 2 ------------------------------------------------
    var nameSpace2 = '/hard';

    // establish a connection to nameSpace
    clientSocket2 = io('http://localhost:3000'+nameSpace2);

    clientSocket2.emit('join', 'client 2');

    clientSocket2.on('message', function(message){
      clientMessage2.push(message);
      expect(message).to.be.a('string');
    });

    // client 3 ------------------------------------------------
    var nameSpace3 = '/hard';

    // establish a connection to nameSpace
    clientSocket3 = io('http://localhost:3000'+nameSpace3);

    clientSocket3.emit('join', 'client 3');

    clientSocket3.on('message', function(message){
      clientMessage3.push(message);
      expect(message).to.be.a('string');
    });


    // -----------------------------------------------------
    // disconnect users in some order
    setTimeout(function() {clientSocket1.disconnect();},  500);
    setTimeout(function() {clientSocket2.disconnect();},  800);
    setTimeout(function() {clientSocket3.disconnect();}, 1200);

    // use settimeout to display user's messages and call done()
    setTimeout(function(){
      console.log('client1 messages:\n', JSON.stringify(clientMessage1));
      console.log('client2 messages:\n', JSON.stringify(clientMessage2));
      console.log('client3 messages:\n', JSON.stringify(clientMessage3));
      done();
    }, 1500)
  });
  // ===================================================================

});