var Promise = require('bluebird');
var Competition = require('./competition.js');

var problems = [];
const num = 100;

for (var i = 0; i < num; i++) {
  problems.push(Math.floor(Math.random() * 3) + 1);
}

console.log('------------------- Populate Competition table ------------------- ');

Competition.sync()
.then(() => {
  return Promise.all(problems.map(problemId => {
    return Competition.create({
      problemId: problemId
    })
  }));
})
.catch(err => {
  console.error(err);
});