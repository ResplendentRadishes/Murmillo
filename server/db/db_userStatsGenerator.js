var Promise = require('bluebird');
var UserStat = require('./db.js').UserStat;

var db = require('./db.js').db;

// User: {
//   compData: [
//   {problemLevel: Easy, winner: true, date: someDate },
//   {problemLevel: Medium, winner: false, date: someDate},
//   {problemLevel: Easy, winner: false, date: someDate}
//   ]
// ========================================================
// 'fakeCompData' generator
// ========================================================
var fakeUserStats = [];
var problemLevel = ['easy', 'medium', 'hard'];
var winOrLoose = [true, false];
var msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
var referenceDate = new Date('December 6, 2016 6:0:00').getTime()
// ----------------------------------------------
var compUserDataGenerator = function(){
  var randTime = Math.floor( Math.random()*30 );
  var randProbLevel = Math.floor( Math.random()*2 );
  var randWinOrLoose = Math.floor( Math.random()*3 );

  var randDate = referenceDate + randTime*msPerDay;

  return {
    problemLevel: problemLevel[randProbLevel],
    winner: winOrLoose[randProbLevel],
    compDate: new Date(randDate),
  }
}
// ----------------------------------------------
var num = 100;
for(var i = 0; i < num; i++) {
  fakeUserStats.push(compUserDataGenerator());
}
// console.log(fakeCompUserData);

// ========================================================
// create 'userComp' table
// ========================================================
// This block of codes will initailizes the database with the data above
// force:true will drop table first before creating them
UserStat.sync({ force: true })
  // (use Promise.all for an array of problems)
  .then(function() {
    return Promise.all(fakeUserStats.map(function(fakeUserStat){
      return UserStat.create({
        problemLevel: fakeUserStat.problemLevel,
        winner:       fakeUserStat.winner,
        compDate:     fakeUserStat.compDate,
      })
    }));
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
  });
// ===============================================
// You can also check data in mySQL workbench
