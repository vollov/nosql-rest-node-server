var http = require('http');
var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

// setup passport for authentication
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

midware = require('./lib/midware')

var app = express();

/**
 * express 4.8.0 version
 * Session Management:
 * Express will create a new session (and write it to the database) whenever it does not detect a session cookie.
 */
// all server settings
app.locals.port = 8000;
app.locals.mongo_options = { uri: 'mongodb://localhost:27017/demo', collection: 'sessions' }
app.locals.session_secret = 'uwotm8xxc'
app.locals.session_age = 1209600000 // in ms 14 * 24 * 60 * 60
	
var sessionOptions = {
	saveUninitialized: false, // saved new sessions
	resave: false, // do not automatically write to the session store
	store: new MongoDBStore(app.locals.mongo_options),
	secret: app.locals.session_secret,
	cookie : { httpOnly: true, maxAge: app.locals.session_age } // configure when sessions expires
}

// serve static resources without session
app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


// error handling middle ware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

app.all('*', midware.header);
require('./api/user')(app);
require('./api/post')(app);

var server = http.createServer(app);
server.listen(app.locals.port, function(){
  console.log('Express server listening on port ' + app.locals.port);
});

