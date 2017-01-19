var Promise = require('bluebird');
var passport = require('passport');
var User = require('../db/user.js');
var UserCompetitions = require('../db/UserCompetitions.js');
var Competition = require('../db/Competition.js');
var Problem = require('../db/Problem.js');
var UserStat = require('../db/userStat.js');

const getUserStats = userId => {
  let userStats = [];
  return UserCompetitions.findAll({ where: { userId: userId } })
  .then(userCompetitions => {
    userCompetitions.forEach(userCompetition => {
      userStats.push({ winner: userCompetition.dataValues.winner, compDate: userCompetition.dataValues.compDate || userCompetition.dataValues.createdAt })
    });
    return Promise.all(userCompetitions.map(userCompetition => {
      return Competition.find({ where: { id: userCompetition.dataValues.competitionId } });
    }));
  })
  .then(competitions => {
    return Promise.all(competitions.map(competition => {
      return Problem.find({ where: { id: competition.dataValues.problemId } });
    }));
  })
  .then(problems => {
    var response;
    problems.forEach((problem, index) => {
      if (problem.dataValues.title === 'simple function 1') {
        response = 'easy';
      } else if (problem.dataValues.title === 'simple function 2') {
        response = 'medium';
      } else if (problem.dataValues.title === 'simple function 3') {
        response = 'hard';
      }
      userStats[index].problemLevel = response;
    });
    return userStats;
  })
  .catch(err => {
    console.log(err);
  });
};

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
      return getUserStats(newUser.id)
      .then(userStats => {
        newUser.userStats = userStats;
        return newUser;
      });
    })
    .then(user => {
      user.games = user.userStats.length;
      var wins = 0;
      user.userStats.forEach(game => {
        if (game.winner) {
          wins++;
        }
      })
      user.wins = wins;
      return res.json(user);
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
  var newUser = {};
  Competition.create({ problemId: req.body.problemId })
  .then ((competition) => {
    UserCompetitions.create({ 
      competitionId: competition.id,
      userId: req.params.id,
      winner: req.body.winner || false
    })
    User.find({ where: { id: req.params.id } })
    .then(user => {
      score = Number(req.body.score);
      let stats = {
        score: user.dataValues.score + score
      };
      return user.updateAttributes(stats)
    })
    .then(user => {
      newUser = user.dataValues;
      return getUserStats(user.id)
      .then(userStats => {
        newUser.userStats = userStats;
        console.log('newUser', newUser);
        return newUser;
      });
    })
    .then(user => {
      user.games = user.userStats.length;
      var wins = 0;
      user.userStats.forEach(game => {
        if (game.winner) {
          wins++;
        }
      })
      user.wins = wins;
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
    })
  })
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
