var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================

describe("Server Socket Response", function () {
  // ===================================================================
  // assign url to request
  request = request('http://localhost:3000');

  beforeEach(function (done) {
    // start serverSocket by calling /api/join/:hard
    request
      .get('/api/join/hard')
      .expect(200, done);
  });
  // ===================================================================
  it('serverSocket should respond with a message (string) upon joining the namespace', function(done) {
    var nameSpace = '/hard';
    var username = 'userA';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    clientSocket.emit('join', username);

    clientSocket.on('joinMessage', function(message){
      console.log('---logging messsage from server:  ', message);
      expect(message).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond with a message (string) upon submitting solution: results should be pass', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n console.log(true); return true; \n}',
      username:  'userA',
      probID: 1,
    };

    clientSocket.emit('submitSoln', userSolnObj);

    clientSocket.on('solutionResult', function(result){
      console.log('---logging result from server:  ', result);
      expect(result).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond with a message (string) upon submitting solution: results should be fail', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n console.log(true); return false; \n}',
      username:  'userA',
      probID: 1,
    };

    clientSocket.emit('submitSoln', userSolnObj);

    clientSocket.on('solutionResult', function(result){
      console.log('---logging result from server:  ', result);
      expect(result).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond with a message (string) upon submitting solution: solution has syntax error', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n console.log(true); return false; \n',
      username:  'userA',
      probID: 1,
    };

    clientSocket.emit('submitSoln', userSolnObj);

    clientSocket.on('solutionResult', function(result){
      console.log('---logging result from server:  ', result);
      expect(result).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });

});