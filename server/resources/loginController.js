var passport = require('passport');

module.exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}