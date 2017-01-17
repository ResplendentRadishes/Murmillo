var Problem = require('./problem.js');
var User = require('./user.js');
var Competition = require('./competition.js');
var UserCompetitions = require('./userCompetitions.js');

UserCompetitions.drop()
.then(User.drop())
.then(Competition.drop())
.then(Problem.drop())
.then(require('./db_problemGenerator'))
.then(User.sync());