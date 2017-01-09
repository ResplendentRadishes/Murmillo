// ==============================================
// TEST CASES
var assert = require('assert');

describe('simple function', function() {
  it('function should sum of a and b', function() {
    var a = 10;
    var b = 5;
    var actual = solution(a, b);
    assert.equal(actual, 15);
  });
  it('Should add randomized numbers', function() {
    var a = Math.floor(Math.random() * 100000);
    var b = Math.floor(Math.random() * 100000);
    var actual = solution(a, b);
    expected = a + b;
    assert.equal(actual, expected);
  });
  it('Should concatenate strings', function() {
    var a = 'foo';
    var b = 'bar';
    var actual = solution(a,b);
    assert.equal(actual, 'foobar');
  })
});
// ==============================================
