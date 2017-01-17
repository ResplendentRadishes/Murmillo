var Sequelize = require('sequelize');
var db = require('./db.js');
// var Competition = require('./competition.js');

var Problem = db.define('problem', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  timelimit: Sequelize.INTEGER,
  title: Sequelize.STRING,
  prompt: Sequelize.STRING,
  template: Sequelize.STRING
});

module.exports = Problem;