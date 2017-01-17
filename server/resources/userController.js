var Promise = require('bluebird');
var passport = require('passport');
var User = require('../db/user.js');
var UserCompetitions = require('../db/UserCompetitions.js');
var Competition = require('../db/Competition.js');
var Problem = require('../db/Problem.js');
var UserStat = require('../db/userStat.js');


module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports.getSession = function (req, res) {
  // only works if there's a user in passport
  if (req.user) {
    let newUser = {};
    statsArray = [];
    let id = { githubId: req.user.profile.id };
    // finds user from database based on github ID
    User.find({ where: id })
    .then(user => {
      newUser = user.dataValues;
      return UserCompetitions.findAll({ where: { userId: newUser.id } });
    })
    .then(array => {
      let compArrayIds = [];
      array.forEach(record => {
        statsArray.push({ winner: record.dataValues.winner, compDate: record.dataValues.createdAt })
        compArrayIds.push(record.dataValues.id);
      });
      newUser.userStats = statsArray;
      return compArrayIds;
    })
    .then(idArray => {
      problemIds = [];
      idArray.forEach((id) => {
        
      });
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    res.json(false);
  }
}

module.exports.updateUser = function (req, res) {
  User.find({ where: { id: req.params.id } })
  .then(user => {
    return user.updateAttributes(req.body)
  })
  .then(user => {
    return res.json(user);
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports.updateScore = function (req, res) {
  User.find({ where: { id: req.params.id } })
  .then(user => {
    wins = req.body.winner ? 1 : 0;
    score = Number(req.body.score);
    let stats = {
      wins: user.dataValues.wins + wins,
      games: user.dataValues.games + 1,
      score: user.dataValues.score + score
    };
    return user.updateAttributes(stats)
  })
  .then(user => {
    return res.json(user);
  })
  .catch(err => {
    console.log(err);
  })
}

// deprecated
module.exports.getUser = function (req, res) {
  User.find({ where: { githubId: req.params.id } })
  .then(user => {
    return res.json(user.dataValues);
  })
  .catch(err => {
    console.log(err);
  });
}


// serving fake compData ----------------------------------
module.exports.getUserStats = function (req, res) {
  UserStat.findAll({raw: true})
  .then(userStats => {
    return res.json(userStats);
  })
  .catch(err => {
    console.log(err);
  });
}
// serving fake compData ----------------------------------


module.exports.githubLogin = function (req, res) {
  userProfile = req.user.profile;
  let newUser = {
    githubId: userProfile.id,
    email: userProfile.emails? userProfile.emails[0].value : '',
    githubUrl: userProfile.profileUrl,
    username: userProfile.displayName,
    avatarUrl: userProfile.photos[0].value
  };
  User.sync()
  .then(() => {
    return User.find({ where: { githubId: userProfile.id } })
  })
  .then((user) => {
    if (!user) {
      return User.create(newUser);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
