var Problem = require('./problem.js');
var User = require('./user.js');
var Competition = require('./competition.js');
var UserCompetitions = require('./userCompetitions.js');
// ==================================================

console.log('------------------- Drop all tables ------------------- ');
UserCompetitions.drop()
  .then(function(){
    return Competition.drop();
  })
  .then(function(){
    return User.drop();
  })
  .then(function(){
    return Problem.drop();
  })
  .catch(function(err) {
    console.log(err);
  });
