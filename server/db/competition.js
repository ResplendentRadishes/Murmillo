var Sequelize = require('sequelize');
var Problem = require('./problem.js');
var db = require('./db.js');

var Competition = db.define('competition');

Problem.hasMany(Competition, {
  onDelete: 'cascade',
  hooks: true
});

Competition.belongsTo(Problem);

Competition.sync();

module.exports = Competition;