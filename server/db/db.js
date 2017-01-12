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

// ==================================================
exports.db = db;
exports.Problem = Problem;
