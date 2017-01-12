var loginRouter = require('express').Router();
var loginController = require('./loginController.js');

// logout
loginRouter.get('/logout', loginController.logout);

module.exports = loginRouter;