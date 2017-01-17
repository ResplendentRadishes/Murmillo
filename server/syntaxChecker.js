//currently this file is not used
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

module.exports = function(userSoln, username, probID, callback) {

  // 1) write user's solution to a file (directory: /userSolnFile)
  try {
    var userSolnUrl = path.join(__dirname, '../userSolnFile/ProbID'+probID+'_'+username+'.js');
    var consoleMessage = '\nconsole.log("syntax checker ran successfully")\n';
    fs.writeFileSync(userSolnUrl, userSoln+consoleMessage, 'utf8');

    // 2) execute user's solution stored in a file
    console.log('running syntax checker now')

    child_process.execFile('node', [userSolnUrl], function(error, success, stderr) {
      // make result available via callback
      if(error){
        stderr = stderr.substring(stderr.indexOf('SyntaxError'), stderr.indexOf('at'));
      }
      callback(success, error, stderr);

      // delete file after checker is done
      fs.unlinkSync(userSolnUrl);

    });

  } catch (err) {
    console.log('error in writing soln file');
    return null;
  }

}

// process.env.PATH
