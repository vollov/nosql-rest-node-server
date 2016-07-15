'use strict';

var tokenizer = require('../lib/token.js');
var User   = require('../models/user');
var mongoose = require('mongoose');
var _ = require("underscore")

var Logger = require('../lib/logger.js');
var logger = Logger().getLogger();

module.exports = function(app, express) {
	var apiRoutes = express.Router();
	
	// http://host/public/1.0/login
	apiRoutes.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		console.log('getting login requests user=' + username + ', password=' + password);
		
		/**
		 * if user and password is in db, create a token from user id 
		 */
		User.findOne({'name': username, 'password': password}, 'name admin', function(err, user) {
			if (!err) {
				//console.log('find one user =' + user.name);
				if(!_.isEmpty(user) ) {
					// credential match, create a token and return 200 
					var login_info = {name : username};
					var token = tokenizer.sign(login_info);
					req.session.token = token;
					res.status(200).json({login_status : "login_success"});
				} else {
					// credential not match, return a 401 code
					res.status(401).json({login_status : "invalid_credential"});
				}
			}else {
				logger.error(err);
				res.status(500).json({login_status : "server_error"});
			}	
		});
	});
	
//	apiRoutes.get('/:id', function(req, res) {
//		var id = req.params.id;
//		User.findOne({'_id': mongoose.Types.ObjectId(id)},'name password', function(err, users) {
//			if (!err) {
//				res.json(users);
//			}else {
//				console.log(err);
//				return res.json(err);
//			}	
//		});
//	});

	app.use('/public/' + app.locals.api_version, apiRoutes);
};