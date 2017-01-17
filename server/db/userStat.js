var Sequelize = require('sequelize');
var db = require('./db.js');

// --------------------------------
// this is created for data templating
var UserStat = db.define('UserStat', {
  problemLevel:   Sequelize.STRING,
  winner:         Sequelize.BOOLEAN,
  compDate:        Sequelize.DATE
});
// --------------------------------

module.exports = UserStat;