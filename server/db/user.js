var Sequelize = require('sequelize');
var db = require('./db.js');

var User = db.define('user', {
  githubId: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  githubUrl: Sequelize.STRING,
  username: Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  games: { type: Sequelize.INTEGER, defaultValue: 0 },
  wins: { type: Sequelize.INTEGER, defaultValue: 0 }
});

User.sync();

module.exports = User;