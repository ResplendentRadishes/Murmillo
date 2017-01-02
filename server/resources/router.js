var router = require('express').Router();

// var codeEvaluate = require('.....');

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
  var roomID = req.params.roomID;

  // open socket for roomID (easy, 'medium', hard)
  // assign user to the correct room

  // Get problem based on easy, medium, hard

  // emit 'start' event to the client (client should listent for 'start' and render home and start time clock)
    // send problem to the user using socket (later)
    // emit 'start' event to the client (client should render home page upon 'start' event)

    // emit 'submitSoln' event from the client (server should evaluate code)
      // 1) evalute code (create a function that reutns 'error', 'fail', 'pass')
      // 2) notify users the results
          // error - syntax error, only notify to a specific only
          // fail - broard resutls to all users int the room
          // pass - close sockets for all users with message

    // listen for 'timeout' event from the client (server should close sockets for all users with message)

  res.end('socket established');
});

// =========================================
module.exports = router;


