var userRouter = require('express').Router();
var userController = require('./userController.js');


userRouter.get('/logout', userController.logout);
userRouter.get('/loginStatus', userController.getSession);
userRouter.get('/profile/:id', userController.getUser);

// serving fakeUserStat-------------------
userRouter.get('/stats/:id', userController.getUserStats);
// --------------------------------------

module.exports = userRouter;
