var userRouter = require('express').Router();
var userController = require('./userController.js');


userRouter.get('/logout', userController.logout);
module.exports = userRouter;