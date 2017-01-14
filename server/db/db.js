var Sequelize = require('sequelize');

// ========================================================
// Note:
// Make sure database 'murmillo' exists before you run this file
// You create a database by running this sql script in terminal
// '   mysql -u root < server/schema.sql    '
// ========================================================


// ==================================================
// DB config setup
// database = 'murmillo' | username = 'root' | password = ''
var db = new Sequelize('murmillo', 'root', '', {
  host: 'localhost',
  dialetc: 'mysql'
});

// ==================================================
// define the models
var Problem = db.define('Problem', {
  timelimit: Sequelize.INTEGER,
  title: Sequelize.STRING,
  prompt: Sequelize.STRING,
  template: Sequelize.STRING
});

var User = db.define('User', {
  githubId: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  githubUrl: Sequelize.STRING,
  username: Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  games: { type: Sequelize.INTEGER, defaultValue: 0 },
  wins: { type: Sequelize.INTEGER, defaultValue: 0 }
});

// ==================================================
exports.db = db;
exports.Problem = Problem;
exports.User = User;