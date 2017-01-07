var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var cors = require('cors');

var router = require('./resources/router.js');
app.use(cors());
// ===============================================
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===============================================
// Serve static content
app.use('/', express.static(__dirname + '/../client/dist'));

// ===============================================
// Setup routes to handle request
app.use('/api', router);

module.exports = app;


