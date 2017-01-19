var Promise = require('bluebird');
var Competition = require('./competition');
var UserCompetitions = require('./userCompetitions.js');

var db = require('./db.js');

var userCompData1 = {
  userId: 1,
  competitionId: 1,
  winner: true
};

var userCompData2 = {
  userId: 1,
  competitionId: 2,
  winner: true
};

var userCompData3 = {
  userId: 1,
  competitionId: 3,
  winner: false
};

var userCompData = [userCompData1, userCompData2, userCompData3];

console.log('------------------- Populate UserComp table ------------------- ');
Promise.all(userCompData.map(function(userComps) {
  return UserCompetitions.create({
    userId: userComps.userId,
    competitionId: userComps.competitionId,
    winner: userComps.winner
  })
}))
.catch(function(err) {
  console.log(err);
});
