var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================

describe("Test socket connection", function () {

  // assign url to request
  request = request('http://localhost:3000');

  beforeEach(function (done) {
    // start serverSocket by calling /api/join/:hard
    request
      .get('/api/join/hard')
      .expect(200, done);
  });

  it('serverSocket should respond with a string message upon join', function(done) {
    var nameSpace = '/hard';
    var username = 'userA';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    clientSocket.emit('join', username);

    clientSocket.on('joinMessage', function(message){
      console.log(message);
      expect(message).to.be.a('string');
      done();
    });
  });

});