var Sequelize = require('sequelize');

// ========================================================
// Note:
// Make sure database 'murmillo' exists before you run this file
// You create a database by running this sql script in terminal
// '   mysql -u root < server/schema.sql    '
// ========================================================


// ==================================================
// DB config setup
// database = 'murmillo' | username = 'murmillo' | password = 'samnite'
var db = new Sequelize('murmillo', 'murmillo', 'samnite', {
  host: 'localhost',
  dialetc: 'mysql'
});


module.exports = db;
