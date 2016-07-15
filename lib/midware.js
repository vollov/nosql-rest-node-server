var Logger = require('./logger.js');
var logger = Logger().getLogger();

var tokenizer = require('./token.js');

module.exports = {
	/**
	 * Add Access-Control-Allow-Headers in HTTP response
	 */
	header : function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		next();
	},
	
	/**
	 * Authentication each /api/* request,
	 * check if the session contains an token id
	 */
	authentication: function(req, res, next) {
		var user_session = req.session;
		logger.debug('authentication() sesseion id=' + user_session.id);

		if(!user_session.token) {
			// 401 not_login or login_failed
			logger.debug('authentication() -- no token from ' + req.ip + ' with session id: ' + user_session.id);
			return res.send(401, { action : 'login' });
		} else {
			logger.debug('authentication found user token' + user_session.token);
			// parse token to get the user id 
			var token = user_session.token;
			
			// if no user id in token, return 401
			
			// else go next()
			next();
			
		}
	}
};
