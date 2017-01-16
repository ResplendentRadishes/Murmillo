var userRouter = require('express').Router();
var userController = require('./userController.js');

// logs the user out of passport
userRouter.get('/logout', userController.logout);
// gets session data and grabs the user from the database based on session
userRouter.get('/loginStatus', userController.getSession);
//updates any aspect about the user, replacing previous information
userRouter.put('/:id', userController.updateUser);
// send { score: 10, winner: true } to increase increase score by 10 and wins by 1
userRouter.patch('/stats/:id', userController.updateScore);
// serving fakeUserStat-------------------
userRouter.get('/stats/:id', userController.getUserStats);
// --------------------------------------

module.exports = userRouter;
