/*global describe, it*/

var mochaChecker = require('../../codeCheck/server/mochaChecker.js');
var expect = require('chai').expect;

describe('mochaChecker', function() {


  var mochaCheckTest = function(code, cb) {
    try{
      mochaChecker(
        code,
        'ishmael',
        3,
        function(result) {
          cb(result);

        }
      );
    }
    catch(error) {
      console.log('there is an error');
      cb(error);
    }
  };

  it('should run without error if the user code has correct syntax', function(done) {

    var expectation = function(actual) {
      expect(typeof actual).to.equal('string');
      done();
    };

    mochaCheckTest('var solution = function(){}', expectation);
  })
  it('should pass all tests for working code', function(done) {

    var expectation = function(actual) {
      expect(actual).to.equal('3 out of 3 passing. ');
      done();
    };

    mochaCheckTest('var solution = function(a,b){return a + b}', expectation);
  })
  it('should return a syntax error if the code will throw an error', function(done){

    var expectation = function(actual) {
      expect(actual.constructor).to.equal(SyntaxError);
      done();
    };

    mochaCheckTest('var solution = function(){return [}]}', expectation);
  })
  it('should identify partial success', function(done){

    var expectation = function(actual) {
      expect(actual.charAt(0)).to.equal('2');
      done();
    };

    mochaCheckTest('var solution = function(a,b){return b + a}', expectation);
  })
  xit('should abort infinite loops', function(done){
    var expectation = function() {
      done();
    }

    mochaCheckTest('var solution = function(a,b){while(true);}', expectation);
  })
})
