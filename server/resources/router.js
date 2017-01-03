var router = require('express').Router();

// import codeEvaluate function
var codeEvaluate = require('../codeEvaluate');

// var http = require('../index.js');
// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
// var io = require('socket.io')(http);
var userController = require('./userController');
// var codeEvaluate = require('.....');
// const socket = require('../index.js');
// console.log("######################################");
// console.log(socket);
// =========================================
// import fakeData
var fakeCompList = require('../../fakeData/fakeCompList.js');
//[ { level: 'easy' }, { level: 'medium' }, { level: 'hard' } ]

// =========================================
// GET compList
router.get('/compList', function(req, res) {
  // send fakeCompList
  res.json(fakeCompList);
});

// GET compList
router.get('/join/:roomID', function(req, res) {
  // send fakeCompList
  console.log("Inside join room router");
  userController.joinRoom(req, res);


});

 
// =========================================
module.exports = router;


