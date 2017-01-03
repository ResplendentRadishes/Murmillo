var fs = require('fs');
var Mocha = require('mocha');

// https://www.npmjs.com/package/sandbox
// https://github.com/substack/node-syntax-error


// ==============================================================
// Write a funciton that evaluates the user's submitted solution
// the funciton should return one of the following results using callback:
  // error - mocha test error
  // fail - mocha test fails
  // pass - mocha test passes
// parameters:
  // userSolnStr = string (for example: 'var solution = function() {return true; }')
  // probID = number      (for example: 1, 2, or 3)
  // username = string    (for example: 'userA')

var codeEvaluate = function(userSolnStr, username, probID, callback) {
  var result = null;

  // 1) grab the test cases from the 'codeChcker' folder based on probID
  var testFileUrl = './codeChecker/test' + probID + '.js';
  var testFileContent = fs.readFileSync(testFileUrl, 'utf8');

  // 2) combine user's solution with the test cases and write it to file
  var solnAndTestURL = './codeChecker/test' +'_'+ username +'_'+ probID + '.js';
  var solnAndTestContent = userSolnStr + '\n' + testFileContent;
  fs.writeFileSync(solnAndTestURL, solnAndTestContent, 'utf8');

  // 3) Run Mocha tests by providing the url (user's soln and test cases)
  var mocha = new Mocha();
  mocha.addFile(solnAndTestURL)
  mocha.run()
    .on('pass', function(test, err) {
      result = 'pass';
      callback(result);
    })
    .on('fail', function(test, err) {
      result = 'fail';
      callback(result);
    })
    .on('end', function() {
      console.log('All done');
      // delete file after test is done
      // fs.unlinkSync(solnAndTestURL);
    })

};

// ==============================================================
// TEST with fakeData
// var fakeUserSoln = 'var solution = function(){ \n return true \n}';
// var fakeUserName = 'userA';
// var fakeProbID = 1;
// codeEvaluate(fakeUserSoln, fakeUserName, fakeProbID, function(result) {
//   console.log(result);
// });

// ==============================================================

module.exports = codeEvaluate;
