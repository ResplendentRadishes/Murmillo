var Promise = require('bluebird');

var db = require('./db.js');
var Problem = require('./problem.js');

// ========================================================
// Use this file to initialize DB with predefined 'Problem' table
// ========================================================
var data1 = {
  id: 1,
  timelimit: 30,
  title: 'simple function 1',
  prompt: 'write function that returns true',
  template: 'var solution = function() {\n  /* your code here */\n};'
};
var data2 = {
  id: 2,
  timelimit: 30,
  title: 'simple function 2',
  prompt: 'write function that returns parameter a',
  template: 'var solution = function(a) {\n  /* your code here */\n};'
};
var data3 = {
  id: 3,
  timelimit: 30,
  title: 'simple function 3',
  prompt: 'write function that returns the sum of paramters a and b',
  template: 'var solution = function(a, b) {\n  /* your code here */\n};'
};
var initialProblems = [data1, data2, data3];

// ===============================================
// This block of codes will initailizes the database with the data above
console.log('------------------- Populate Problem tables ------------------- ');

Problem.sync()
  // 1) create tables using initial problems above
  // (use Promise.all for an array of problems)
  .then(function() {
    return Promise.all(initialProblems.map(function(problem){
      return Problem.create({
        id:         problem.id,
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
        db.close();
      });
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
  });
// ===============================================
// You can also check data in mySQL workbench
