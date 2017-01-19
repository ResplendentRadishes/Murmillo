var request = require('supertest');
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;
var io = require('socket.io-client');

// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================

describe("Server Socket Response: open all three rooms", function () {
  // ===================================================================
  // Start all rooms ('hard', 'medium', 'easy')

  // assign url to request
  request = request('http://localhost:3000');

  // ===================================================================
  // use beforeEach block to establish server socket connection
  // test connection on 'hard', 'medium', 'easy'
  beforeEach(function (done) {
    // start serverSocket for 'hard' by calling /api/join/:hard
    request
      .get('/api/join/hard')
      .expect(200)
      .end(function(err, res){
        console.log('   ---logging response from server: '+res.text);
        expect(res.text).to.be.a('string');
        done();
      });
  });

  beforeEach(function (done) {
    // start serverSocket for 'medium'  by calling /api/join/:medium
    request
      .get('/api/join/medium')
      .expect(200)
      .end(function(err, res){
        console.log('   ---logging response from server: '+res.text);
        expect(res.text).to.be.a('string');
        done();
      });
  });

  beforeEach(function (done) {
    // start serverSocket for 'easy' by calling /api/join/:easy
    request
      .get('/api/join/easy')
      .expect(200)
      .end(function(err, res){
        console.log('   ---logging response from server: '+res.text);
        expect(res.text).to.be.a('string');
        done();
      });
  });

  // ===================================================================
  it('server should open all three rooms', function(done) {
    done();
  });
  // ===================================================================

});