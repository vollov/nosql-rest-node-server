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
//	tearDown: function (done) {
//        // clean up
//        done();
//    },
    
	'find() without filter' : function(test) {
		
		User.find({}, 'name password', function(err, users) {
			//console.log('user find() size = ' + users.length);
			test.expect(1);
			if (err) {
				console.log('user find() error:' + err);
				//return handleError(err);
			}
			var expected = 2;
			test.equal(users.length, expected, 'number of users should be ' + expected);
			//console.log('\nuser find() done()!');
			test.done();
		});
		
		
	},
	'find() with filter' : function(test) {
		User.find({name: 'anna'},'name password', function(err, users) {
			test.expect(1);
			if (err) {
				console.log('user find() error:' + err);
				//return handleError(err);
			}
			//console.log("\nusers find({name: 'anna'}) length = " + users.length);
			var expected = 1;
			test.equal(users.length, expected, 'number of users should be ' + expected);
			test.done();
		});
	},
	'findOne() with null result' : function(test) {
		User.find({name: 'annax'},'name password', function(err, user) {
			test.expect(1);
			if (err) {
				console.log('user find() error:' + err);
				//return handleError(err);
			}
			//console.log("\nusers find({name: 'annax'}) length = " + user);
			var expected = [];
			test.deepEqual(user, expected, 'should be no user match');
			test.done();
		});
	},
	'findOne() with 1 result' : function(test) {
		User.findOne({name: 'anna'},'name password', function(err, user) {
			test.expect(1);
			if (err) {
				console.log('user findOne() error:' + err);
				//return handleError(err);
			}
			//console.log("\nuser find({name: 'anna'}) length = " + user.name);
			var expected = 'pwd1';
			test.equal(user.password, expected, 'number of user password should be ' + expected);
			test.done();
		});
	}
};