var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');

// ==============================================================
var mochaChecker = function(userSoln, username, probID, callback) {
// mochaChecker evaluates the user's submitted solution against Mocha tests
// @ paratemers:
  // userSoln - string ('var myFunc = function(){.....}');
  // username - string ('userA')
  // probID - number (1, 2, or 3)
  // callback - cabll back to transmit the result
// @ output:
  // 'fail' - mocha test fails
  // 'pass' - mocha test passes

  var result = null;

  // 1) grab the test cases from the 'codeChcker' folder based on probID
  // var testFileUrl = './codeChecker/test' + probID + '.js';
  try {
    var testFileUrl = path.join(__dirname, '../mochaTestFiles/test' + probID + '.js');
    var testFileContent = fs.readFileSync(testFileUrl, 'utf8');
  } catch (err) {
    console.log('error in reading mocha test file');
    return null;
  }

  // 2) combine user's solution with the test cases and write it to file
  try {
    var solnAndTestURL = path.join(__dirname, '../userSolnFile/ProbID'+probID+'_'+username+'Mocha.js');
    var solnAndTestContent = userSoln + '\n' + testFileContent;
    fs.writeFileSync(solnAndTestURL, solnAndTestContent, 'utf8');
  } catch (err) {
    console.log('error in writing soln+mocha file');
    return null;
  }

  // 3) Run Mocha tests by providing the url (user's soln and test cases)
  var result = '';
  delete require.cache[solnAndTestURL] // need this to run more than once
  var mocha = new Mocha();
  mocha.addFile(solnAndTestURL)
  mocha.run()
    .on('pass', function(test, err) {
      result = 'pass';
    })
    .on('fail', function(test, err) {
      result = 'fail';
    })
    .on('end', function() {
      // delete file after test is done
      fs.unlinkSync(solnAndTestURL);
      callback(result);
    })

};

module.exports = mochaChecker;

// ==============================================================
// TEST with fakeData (To Be Deleted Later)
// var fakeUserSoln = 'var solution = function(){ \n return true \n}';
// var fakeUserName = 'userA';
// var fakeProbID = 1;
// codeEvaluate(fakeUserSoln, fakeUserName, fakeProbID, function(result) {
//   console.log(result);
// });
