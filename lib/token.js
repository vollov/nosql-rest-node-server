'use strict';

var cfg = require('../config.js');
var jwt = require('jsonwebtoken');

module.exports = {
		
	/**
	 * sign() convert an object to token
	 */
	sign : function(object) {
		var token = jwt.sign(object, cfg.jwt.secret,
				{
					algorithm: cfg.jwt.algorithm,
					expiresInSeconds: cfg.jwt.expiresInSeconds
				});
		return token;
	},
	
	
	/**
	 * verify() convert a token to decoded data object
	 * 
	 * callback should be: function(err, data)
	 */
	verify : function(token, callback) {
		jwt.verify(token, cfg.jwt.secret, {
			algorithms : [ cfg.jwt.algorithm ],
			ignoreExpiration : false
		}, callback);
	}
};