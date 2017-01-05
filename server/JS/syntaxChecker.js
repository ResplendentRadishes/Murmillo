
const exec = require('child_process').exec;
// callback is for passing success andn SyntaxError messages to the handleSubmitSolution function in the sockethandler
module.exports = function(callback) {
  exec('/usr/local/bin/node /Users/nimmyissac/Desktop/Thesis/Murmillo/server/JS/sum.js', function(error, stdout, stderr)  {
    callback(stdout,stderr);
  });
}
  
//check error
// if success , evaluate code(run mocha tests)
//if not send message to user 

