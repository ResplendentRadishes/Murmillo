// write tests for the server (later)
// ==============================================
var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('GET/', function() {
  // assign url to request
  request = request('http://localhost:3000');

  it('GET to home page should respond with statusCode 200', function(done) {
    request
      .get('/')
      .expect(200, done);
  });
});
// ==============================================
