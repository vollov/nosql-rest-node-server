var db = require('../lib/db.js');
var mongojs = require('mongojs');
var uuid = require('node-uuid');

module.exports = function(app) {
	
	app.get('/api/post', function(req, res) {
		req.session.vvv = 'value-to-set';// +  uuid.v4();
		db.find('post',{},{},{},10,function(err, posts) {
			if (!err) {
				return res.json(posts);
			} else {
				return console.log(err);
			}
		});
	});

	app.get('/api/post/:id', function(req, res){
		var id = req.params.id;
		db.findOne('post', {'_id': mongojs.ObjectId(id)}, {}, function(err, post){
			if (!err) {
				//console.log('look up post.email = %j',post.email);
				return res.json(post);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.post('/api/post', function(req, res){
		db.save('post', req.body);
		res.json(req.body);
	});
	
	app.put('/api/post/:id', function(req, res){
		var id = req.params.id;
		console.log('editing post id =' + id);
		console.log('updating ' + req.body);
		
		delete req.body['_id'];
		db.update('post',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
			function(err, post){
				//res.json(req.body);
			if (!err) {
				//console.log('look up post.email = %j',post.email);
				return res.json(post);
			} else {
				return console.log(err);
			}
		});
	});
	
	app.delete('/api/post/:id', function(req, res){
		var id = req.params.id;
		
		db.remove('post', {'_id': mongojs.ObjectId(id)}, function(err, post){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});

};