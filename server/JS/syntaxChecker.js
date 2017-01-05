
//const exec = require('child_process').exec;
var child_process = require('child_process');

// callback is for passing success andn SyntaxError messages to the handleSubmitSolution function in the sockethan
// module.exports = function(callback) {
//   exec('/usr/local/bin/node /Users/nimmyissac/Desktop/Thesis/Murmillo/server/JS/sum.js', function(error, stdout, stderr)  {
//     callback(stdout,stderr);
//   });
// }
 module.exports = function(callback) {
  child_process.execFile('/usr/local/bin/node', ['./sum.js'], function (error, success) {
      callback(success, error);
  });
 }
//check error
// if success , evaluate code(run mocha tests)
//if not send message to user 
//process.env.PATH
