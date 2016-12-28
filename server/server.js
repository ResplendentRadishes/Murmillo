var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// Attach middleware:

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//

app.use(express.static(__dirname + '/../client/dist'));

module.exports = app;