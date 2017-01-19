var Problem = require('./problem.js');
var User = require('./user.js');
var Competition = require('./competition.js');
var UserCompetitions = require('./userCompetitions.js');
// ==================================================

console.log('------------------- Define all tables ------------------- ');
// define all tables
Problem.sync()
  .then(function(problem){
    return User.sync();
  })
  .then(function(user){
    return Competition.sync();
  })
  .then(function(){
    return UserCompetitions.sync();
  })
  .catch(function(err) {
    console.log(err);
  });