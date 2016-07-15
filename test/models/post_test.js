'use strict';


/**
 * Testing DB query for user model
 */
var test_connection = require("./db_connect.js")();
var User = require('../../models/user.js');

exports.model_user_test = {
		setUp : function(done) {
			console.log('\nsetting up...');
			done();
		},
		
		'model_user_test findOne() with null result' : function(test) {
			console.log('\npost test1()...');
			test.done();
		},
		'model_user_test findOne() with multi result' : function(test) {
			console.log('\npost test2()...');
			test.done();
		},
}