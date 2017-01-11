var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var GithubStrategy = require('passport-github').Strategy;
var apiRouter = require('./resources/apiRouter.js');
var loginRouter = require('./resources/loginRouter.js');
var app = express();

app.use(cors());
// ===============================================
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//================================================
// Passport
passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID
  clientSecret: GITHUB_CLIENT_SECRET
  callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.use(session({secret: 'MurmilloSecret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for customer user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization
  // get user from mySql database?
  // null is for errors
  done(null, user);
})

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), 
  function(req, res) {
    res.redirect('/');
  }
)
// ===============================================
// Serve static content
app.use('/', express.static(__dirname + '/../client/dist'));

// ===============================================
// Setup routes to handle request
app.use('/', loginRouter);
app.use('/api', apiRouter);

module.exports = app;