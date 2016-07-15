// =======================
// package import
// =======================
var http = require('http');
var express = require('express');

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose    = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var path = require('path');

var midware = require('./lib/midware');

var cfg = require('./config');
var Logger = require('./lib/logger.js');
var logger = Logger().getLogger();
var app = express();

//=======================
//configuration
//=======================
var port = parseInt(process.env.PORT,10) || cfg.port;
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));

app.use(cookieParser('S3CRE7', {maxAge: 1200*1000})); // 20 minutes
//serve static resources without session
app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static(__dirname + '/app'));
/**
 * express 4.8.0 version Session Management:
 * Express will create a new session (and write it to the database) whenever it does not detect a session cookie.
 */
var db_url = 'mongodb://'+ cfg.db.host + ':' + cfg.db.port + '/' + cfg.db.name;
app.locals.mongo_options = { uri: db_url, collection: 'sessions' }
	
var sessionOptions = {
	saveUninitialized: true, // saved new sessions
	resave: false, // do not automatically write to the session store
	store: new MongoDBStore(app.locals.mongo_options),
	secret: cfg.session.secret,
	cookie : { httpOnly: true, maxAge: cfg.session.age }, // configure when sessions expires
	proxy: false //true, if you do SSL outside of node.
}

app.use(session(sessionOptions));

//=======================
// connect database
//=======================
mongoose.connect(db_url); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db connected');
});

mongoose.set('debug', true);

app.locals.api_version='1.0'

app.all('*', midware.header);
app.all('/api/*', midware.authentication);

require('./api/auth')(app, express);
require('./api/user')(app, express);
//require('./api/post')(app);

var server = http.createServer(app);
server.listen(port, function(){
  console.log('Express server listening on port ' + port);
  console.log('Now serving the app at http://localhost:' + port + '/app');
});

