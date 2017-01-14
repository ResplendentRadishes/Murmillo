var userRouter = require('express').Router();
var userController = require('./userController.js');


userRouter.get('/logout', userController.logout);
userRouter.get('/loginStatus', userController.getSession);
userRouter.get('/profile/:id', userController.getUser);
module.exports = userRouter;