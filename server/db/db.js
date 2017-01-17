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
  id: { type: Sequelize.INTEGER, primaryKey: true},
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


var Competition = db.define('Competition', {
  problem_id: {
    type: Sequelize.INTEGER,
    references: Problem,
    referencesKey:'id'
  }
});

var UserCompetitions = db.define('UserCompetitions', {
  competition_id: {
    type: Sequelize.INTEGER,
    references: Competition,
    referencesKey: 'id'
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: User,
    referencesKey: 'id'
  },
  winner: Sequelize.BOOLEAN
});

// --------------------------------
// this is created for data templating
var UserStat = db.define('UserStat', {
  problemLevel:   Sequelize.STRING,
  winner:         Sequelize.BOOLEAN,
  compDate:        Sequelize.DATE
});
// --------------------------------

// ==================================================
// defining relationships
Problem.hasMany(Competition, {
  onDelete: 'cascade',
  hooks: true
});
Competition.belongsTo(Problem);
User.hasMany(UserCompetitions, {
  onDelete: 'cascade',
  hooks: true
});
UserCompetitions.belongsTo(User);
Competition.hasMany(UserCompetitions, {
  onDelete: 'cascade',
  hooks: true
});
UserCompetitions.belongsTo(Competition);

// ==================================================
exports.db = db;
exports.Problem = Problem;
exports.User = User;
exports.UserStat = UserStat;
exports.Competition = Competition;
exports.UserCompetitions = UserCompetitions
