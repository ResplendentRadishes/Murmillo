var passport = require('passport');

module.exports.logout = function (req, res) {
  console.log('logging out');
  req.logout();
  res.redirect('/');
}