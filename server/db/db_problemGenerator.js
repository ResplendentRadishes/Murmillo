var Promise = require('bluebird');

var db = require('./db.js').db;
var Problem = require('./db.js').Problem;

// ========================================================
// Use this file to initialize DB with predefined 'Problem' table
// ========================================================
var data1 = {
  title: 'simple function 1',
  prompt: 'write function that returns true',
  template: 'var myFunc = function(){....};'
};
var data2 = {
  title: 'simple function 2',
  prompt: 'write function that returns true',
  template: 'var myFunc = function(){....};'
};
var data3 = {
  title: 'simple function 3',
  prompt: 'write function that returns the sum of paramters a and b',
  template: 'var myFunc = function(a,b){....};'
};
var initialProblems = [data1, data2, data3];

// ===============================================
// This block of codes will initailizes the database with the data above
Problem.sync()
  // 1) delete all records in 'Problem' table to start with a clean table
  .then(function() {
    return Problem.destroy({
      where: {},
      truncate: true
    });
  })
  // 2) create tables using initial problems above
  // (use Promise.all for an array of problems)
  .then(function() {
    return Promise.all(initialProblems.map(function(problem){
      return Problem.create({
        title:    problem.title,
        prompt:   problem.prompt,
        template: problem.template
      })
    }));
  })
  // 3) Display problems to verify that they are saved to database
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
