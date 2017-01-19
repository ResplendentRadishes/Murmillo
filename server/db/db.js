var Sequelize = require('sequelize');

// ========================================================
// Note:
// Make sure database 'murmillo' exists before you run this file
// You create a database by running this sql script in terminal
// '   mysql -u root < server/schema.sql    '
// ========================================================


// ==================================================
// DB config setup
// database = 'murmillo' | username = 'root' | password = 'samnite'
var db = new Sequelize('murmillo', 'root', 'samnite', {
  //change password to '' when running outside of docker
  host: 'mysql', //change host to 'localhost' to run outside of docker
  dialetc: 'mysql'
});


module.exports = db;
