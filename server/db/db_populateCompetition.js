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

var compData = [compData1, compData2, compData3];

console.log('------------------- Populate Competition table ------------------- ');
Promise.all(compData.map(function(comps) {
  return Competition.create({
    problemId: comps.problemId
  })
}))
.catch(function(err) {
  console.log(err);
});
