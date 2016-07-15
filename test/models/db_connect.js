'use strict';

var cfg = require('../../config.js');
var mongoose    = require('mongoose');

module.exports = function(){
	
	var db_url = 'mongodb://'+ cfg.db.host + ':' + cfg.db.port + '/' + cfg.db.name;
	
	try {
		var db_conn_state = mongoose.connection.readyState;
		console.log('db connetion status is ' + db_conn_state);
        var db = mongoose.connection;
        //console.log(mongoose.connection.readyState);
        //Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        if(db_conn_state == 0){
        	console.log("db disconnected, reconnecting ...");
        	mongoose.connect(db_url);
        }
        
		db.on('error', console.error.bind(console, 'connection error:'));
		db.on('connected', function() {
			console.log('db connected for testing');
		});
		db.on('disconnected',function(){
			console.log('db disconnected......');
			mongoose.connect(db_url);
		});
        
    } catch (err) {
        console.log('db connection for testing failed:', err.message);
    }

}