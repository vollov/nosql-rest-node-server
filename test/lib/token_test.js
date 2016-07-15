'use strict';


var tokenizer = require('../../lib/token.js');

/**
 * Testing wrappers for jsonwebtoken
 */

var test_obj = {name: 'dustin'};

exports.token_test = {
	setUp : function(done) {
		
		console.log('\nsetting up...');
		done();
	},
	'token_test.sign()' : function(test) {
		console.log('token_test sign()...');
		
		var token = tokenizer.sign(test_obj);
		//console.log('token_test.sign() token = ' + token + ', done...');
		test.done();
	},
	'token_test.verify()' : function(test) {
		console.log('token_test verify()...');
		var token = tokenizer.sign(test_obj);
		tokenizer.verify(token, function(err, decoded) {
			if (err){
				console.log('token_test.verify() error=' + err);
				console.log('token_test.verify() error.name=' + err.name);
			}
			//console.log('token_test.verify() decoded data.name=' + decoded.name);
		});
		test.done();
	},
};