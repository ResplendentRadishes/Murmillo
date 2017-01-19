var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Main Server should be running on localhost:3000 ***
// *** Note: Code Checker Server should be running also      ***
// ============================================================

describe("Server Socket Response: submitSoln", function () {
  // ===================================================================
  // assign url to request (MainServer)
  request = request('http://localhost:3000');

  beforeEach(function (done) {
    // start serverSocket by calling /api/join/:hard
    request
      .get('/api/join/hard')
      .expect(200, done);
  });

// ===================================================================
// problem ID = 1:
// write function that returns parameter a
// var solution = function(a){/* your code here */};
// ===================================================================
  it('serverSocket should respond upon submitting solution: correct solution', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    clientSocket.emit('join', 'client 1');
    clientSocket.emit('problem', 1);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n console.log(true); return true; \n}',
      username:  'userA',
      probID: 1,
    };

    // wait 1100 ms since getting problem from DB will take some time
    setTimeout(function() {
      clientSocket.emit('codeSubmission', userSolnObj);
    },  1100);

    clientSocket.on('codeSubmission', function(resultObj){
      console.log('   ---logging resultObj from server:  ', resultObj);
      expect(resultObj.resultMsg).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond upon submitting solution: incorrect solution', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    clientSocket.emit('join', 'client 1');
    clientSocket.emit('problem', 1);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n return false; \n}',
      username:  'userA',
      probID: 1,
    };

    // wait 1100 ms since getting problem from DB will take some time
    setTimeout(function() {
      clientSocket.emit('codeSubmission', userSolnObj);
    },  1100);

    clientSocket.on('codeSubmission', function(resultObj){
      console.log('   ---logging resultObj from server:  ', resultObj);
      expect(resultObj.resultMsg).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond upon submitting solution: syntax', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    clientSocket.emit('join', 'client 1');
    clientSocket.emit('problem', 1);

    // create userSolnObj to send to server
    var userSolnObj = {
      userSoln:  'var solution = function(){ \n return fale; }\n',
      username:  'userA',
      probID: 1,
    };

    // wait 1100 ms since getting problem from DB will take some time
    setTimeout(function() {
      clientSocket.emit('codeSubmission', userSolnObj);
    },  1100);

    clientSocket.on('codeSubmission', function(resultObj){
      console.log('   ---logging resultObj from server:  ', resultObj);
      expect(resultObj.resultMsg).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================

});