var githubRouter = require('express').Router();
var passport = require('passport');
var userController = require('./userController.js');

githubRouter.get('/', passport.authenticate('github'));
githubRouter.get('/callback', passport.authenticate('github', { failureRedirect: '/' }), 
  function(req, res) {
    userController.githubLogin(req, res);
    res.redirect('/#/dashboard');
  }
)

module.exports = githubRouter;
