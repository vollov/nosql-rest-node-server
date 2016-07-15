'use strict';

var cfg = require('../config.js');
var Logger = require('../lib/logger.js');

var logger = Logger().getLogger();

exports.config_test = {
		
		setUp : function(done) {
			console.log('\nconfig test setUp()...');
			done();
		},
		/**
		 * testing server port number configuration.
		 * @param test
		 */
		'test port' : function(test) {
			console.log('[1] testing config port...');
			logger.info({lang: 'fr'}, 'testing config port');
			var expected_port = 8000;
			test.equal(cfg.port, expected_port, 'port should be ' + expected_port);
			test.done();
		},
		'test 2' : function(test) {
			console.log('[2] config test2()...');
			test.done();
		},
	};