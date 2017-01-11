// ==============================================
// TEST CASES
var assert = require('assert');

describe('simple function', function() {
  it('Should return the value passed into it', function() {
    var test = 10;
    var expected = test;
    var actual = solution(test);
    assert.equal(actual, expected);
  });
  it('Should pass for arrays', function() {
    var test = [0, 1, 2];
    var expected = test;
    var actual = solution(test);
    assert.equal(actual, expected);
  });
});
// ==============================================
