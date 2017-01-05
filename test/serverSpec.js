var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
// ============================================================
// *** Note: Server should be running on localhost:3000 ***
// ============================================================
describe('Test API endpoints', function() {
  // assign url to request
  request = request('http://localhost:3000');

  it('GET/ should respond with statusCode 200', function(done) {
    request
      .get('/')
      .expect(200, done);
  });

  it('GET/api/compList should respond with an array of competition list', function(done) {
    request
      .get('/api/compList')
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        expect(res.body).to.be.instanceof(Array);
        done();
      });
  });

  it('GET/api/join should respond with a string message', function(done) {
    request
      .get('/api/join/:hard')
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        console.log(res.text)
        expect(res.text).to.be.a('string');;
        done();
      });
  });

});
// ============================================================
