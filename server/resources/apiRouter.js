var apiRouter = require('express').Router();
var roomController = require('./roomController');

// =========================================
// import fakeData (Delete Later)
var fakeCompList = require('../../fakeData/fakeCompList.js');
// =========================================


// GET compList
apiRouter.get('/compList', function(req, res) {
  res.json(fakeCompList);   // send fakeCompList
});

// GET joinRoom
apiRouter.get('/join/:roomID', roomController.joinRoom);

// =========================================
module.exports = apiRouter;