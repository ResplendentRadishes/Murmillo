var Promise = require('bluebird');
var Competition = require('./competition');
var UserCompetitions = require('./userCompetitions.js');

var db = require('./db.js');

var compData1 = {
  problemId: 1
};

var compData2 = {
  problemId: 2
};

var compData3 = {
  problemId: 3
};

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

var compData = [compData1, compData2, compData3];
var userCompData = [userCompData1, userCompData2, userCompData3];

Promise.all(compData.map(function(comps) {
  return Competition.create({
    problemId: comps.problemId
  })
}));

Promise.all(userCompData.map(function(userComps) {
  return UserCompetitions.create({
    userId: userComps.userId,
    competitionId: userComps.competitionId,
    winner: userComps.winner
  })
}));