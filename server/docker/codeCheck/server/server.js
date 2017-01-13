var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var mochaChecker = require('./mochaChecker.js');

var app = express();

var router = express.Router();

router.get('/', function(req, res) {
  res.send('new phone who dis?');
});

router.post('/test/:id', function(req, res) {
  var problemId = req.params.id;
  var code = req.body.code || 'var solution = function(){}';

  console.log('checking mocha in the container');
  try{
    mochaChecker(
      code,
      'ishmael',
      problemId,
      function(result) { res.send(result); }
    );
  }
  catch(error) {
    console.log(error);
    res.send(error.message);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

var port = '8510';
app.set('port', port);

var server = http.createServer(app);

server.listen( port, () => console.log('listening on 8510') );
