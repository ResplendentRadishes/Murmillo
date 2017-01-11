var loginRouter = require('express').Router();
var loginController = require('./loginController.js');
// var roomController = require('./roomController');

// =========================================
// import fakeData (Delete Later)
// var fakeCompList = require('../../fakeData/fakeCompList.js');
// =========================================


// logout
loginRouter.get('/logout', loginController.logout);
// GET joinRoom
// apiRouter.get('/join/:roomID', roomController.joinRoom);

// =========================================
module.exports = loginRouter;