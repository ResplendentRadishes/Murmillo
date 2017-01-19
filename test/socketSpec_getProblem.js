var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================

describe("Server Socket Response: getProblem", function () {
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
  it('serverSocket should respond with problemSet upon requesting the problem', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    // getProblem with problemID=1
    clientSocket.emit('join', 'client 1');
    clientSocket.emit('problem', 1);

    clientSocket.on('problem', function(problem){
      console.log('   ---logging result from server:  ', problem);
      expect(problem.title).to.be.a('string');
      expect(problem.prompt).to.be.a('string');
      expect(problem.template).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================
  it('serverSocket should respond with error object for invalid problemID', function(done) {
    var nameSpace = '/hard';

    // establish a connection to nameSpace (/hard)
    var clientSocket = io('http://localhost:3000'+nameSpace);

    // getProblem with problemID=0 (does not exist)
    clientSocket.emit('join', 'client 2');
    clientSocket.emit('problem', 0);

    clientSocket.on('problem', function(problem){
      console.log('   ---logging result from server:  ', problem);
      expect(problem.title).to.be.a('string');
      expect(problem.prompt).to.be.a('string');
      expect(problem.template).to.be.a('string');
      clientSocket.disconnect();
      done();
    });
  });
  // ===================================================================

});