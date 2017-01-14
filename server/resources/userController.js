var User = require('../db/db.js').User;
var passport = require('passport');

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

module.exports.githubLogin = function (req, res) {
  userProfile = req.user.profile;
  let newUser = {
    githubId: userProfile.id,
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