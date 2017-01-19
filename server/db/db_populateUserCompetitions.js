var Promise = require('bluebird');
var UserCompetitions = require('./userCompetitions.js');

const competitions = 100;
const users = 4;
const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
const referenceDate = new Date('January 12, 2017 6:0:00').getTime();

var userCompetitions = [];

for (var i = 0; i < competitions; i++) {
  var randTime = Math.floor(Math.random()*7);
  var randDate = referenceDate + randTime * msPerDay;
  var winner = Math.floor(Math.random() * 4);
  for (var j = 0; j < users; j++) {
    userCompetitions.push({
      competitionId: i + 1,
      userId: j + 1,
      compDate: new Date(randDate),
      winner: winner === j
    })
  }
}

// userCompetitions.forEach(competition => {

// });
console.log('------------------- Populate UserComp table ------------------- ');
UserCompetitions.sync()
.then(() => {
  return Promise.all(userCompetitions.map(userCompetition => {
    return UserCompetitions.create(userCompetition);
  }));
});