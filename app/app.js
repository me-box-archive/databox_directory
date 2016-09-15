var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var db = require('./database/db.js');

var api = require('./routes/api');

var app = express();

var debug = require('debug')('databox_directory:server');
var http = require('http');

// get port from env or 3000
const PORT = 3000;
app.set('port', PORT);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers for app 

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);

/**
 * Event listener functions for HTTP server
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('error', onError);
server.on('listening', onListening);
server.listen(, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
      console.log('database connection active')
    
  }
})

module.exports = app;
