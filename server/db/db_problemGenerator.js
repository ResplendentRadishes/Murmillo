var Promise = require('bluebird');

var db = require('./db.js').db;
var Problem = require('./db.js').Problem;
var User = require('./db.js').User;
var Competition = require('./db.js').Competition;
var UserCompetitions = require('./db.js').UserCompetitions;
// ========================================================
// Use this file to initialize DB with predefined 'Problem' table
// ========================================================
var data1 = {
  timelimit: 30,
  title: 'simple function 1',
  prompt: 'write function that returns true',
  template: 'var solution = function(){/* your code here */};'
};
var data2 = {
  timelimit: 30,
  title: 'simple function 2',
  prompt: 'write function that returns parameter a',
  template: 'var solution = function(a){/* your code here */};'
};
var data3 = {
  timelimit: 30,
  title: 'simple function 3',
  prompt: 'write function that returns the sum of paramters a and b',
  template: 'var solution = function(a,b){/* your code here */};'
};
var initialProblems = [data1, data2, data3];

// ===============================================
// This block of codes will initailizes the database with the data above
// force:true will drop table first before creating them
User.sync({ force: true });
Competition.sync({ force: true });
UserCompetitions.sync({ force: true });
Problem.sync({ force: true })
  // 1) create tables using initial problems above
  // (use Promise.all for an array of problems)
  .then(function() {
    return Promise.all(initialProblems.map(function(problem){
      return Problem.create({
        timelimit:  problem.timelimit,
        title:      problem.title,
        prompt:     problem.prompt,
        template:   problem.template
      })
    }));
  })
  // 2) Display problems to verify that they are saved to database
  .then(function(problems) {
    return Problem.findAll({})
      .then(function(problems) {
        console.log('--------------------------');
        console.log('Logging Problems Saved on DB');
        console.log(problems);
        console.log('---------------------------');

        // close db
        db.close();
      });
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
  });
// ===============================================
// You can also check data in mySQL workbench
