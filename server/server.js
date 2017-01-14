var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var GithubStrategy = require('passport-github').Strategy;
var apiRouter = require('./resources/apiRouter.js');
var githubRouter = require('./resources/githubRouter.js');
var userRouter = require('./resources/userRouter.js');
var userController = require('./resources/userController.js');
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
  clientID: 'd8bdf2c7dfe8d2f386df',
  clientSecret: '453a911dc3499b393cfae15c5b6983887e653c2d',
  callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }
));

app.use(session({
  secret: 'MurmilloSecret',
  resave: true,
  saveUninitialized: false
}));

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

// ===============================================
// Serve static content
app.use('/', express.static(__dirname + '/../client/dist'));

// ===============================================
// Setup routes to handle request

app.use('/api', apiRouter);
app.use('/auth/github', githubRouter);
app.use('/user', userRouter);

module.exports = app;