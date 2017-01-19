var Sequelize = require('sequelize');
var db = require('./db.js');
var User = require('./user.js');
var Competition = require('./competition.js');

var UserCompetitions = db.define('userCompetitions', {
  winner: Sequelize.BOOLEAN,
  compDate: Sequelize.DATE
});

User.hasMany(UserCompetitions, {
  onDelete: 'cascade',
  hooks: true
});

Competition.hasMany(UserCompetitions, {
  onDelete: 'cascade',
  hooks: true
});

UserCompetitions.belongsTo(User);
UserCompetitions.belongsTo(Competition);

module.exports = UserCompetitions;