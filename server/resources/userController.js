var User = require('../db/db.js').User;
var passport = require('passport');

var UserStat = require('../db/db.js').UserStat;


module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports.getSession = function (req, res) {
  // only works if there's a user in passport
  if (req.user) {
    let id = { githubId: req.user.profile.id };
    User.find({ where: id })
    .then(user => {
      return res.json(user.dataValues);
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
