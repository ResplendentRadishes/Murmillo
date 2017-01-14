var User = require('../db/db.js').User;
var passport = require('passport');

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports.getSession = function (req, res) {
  if (req.user) {
    // TODO send a findOrCreate command to the server with this user
    res.json(req.user);
  } else {
    res.json(false);
  }
}

module.exports.getUser = function (req, res) {
  User.find({ where: { githubId: req.params.id } })
  .then(user => {
    res.json(user.dataValues);
  })
}

module.exports.githubLogin = function (req, res) {
  userProfile = req.user.profile;
  let newUser = {
    githubId: userProfile.id,
    email: userProfile.emails[0].value,
    githubUrl: userProfile.profileUrl,
    username: userProfile.displayName,
    avatarUrl: userProfile.photos[0].value
  };
  User.sync()
  .then(() => {
    return User.find({ where: { githubId: userProfile.id }})
  })
  .then((user) => {
    if (!user) {
      console.log('user does not exist');
      User.create(newUser);
    } else {
      console.log('user already exists');
    }
  })
  .catch((err) => {
    console.log(err);
  });
}