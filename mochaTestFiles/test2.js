// ==============================================
// TEST CASES
var assert = require('assert');

describe('simple function', function() {
  it('function should return true', function() {
    var a = 10;
    var b = 5;
    var actual = solution(a, b);
    expected = a + b;
    assert.equal(actual, expected);
  });
});
// ==============================================
