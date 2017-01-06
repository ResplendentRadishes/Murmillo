var router = require('express').Router();
var roomController = require('./roomController');

// =========================================
// import fakeData (Delete Later)
var fakeCompList = require('../../fakeData/fakeCompList.js');
// =========================================


// GET compList
router.get('/compList', function(req, res) {
  res.json(fakeCompList);   // send fakeCompList
});

// GET joinRoom
router.get('/join/:roomID', roomController.joinRoom);

// =========================================
module.exports = router;


