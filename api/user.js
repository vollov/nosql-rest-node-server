var User   = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(app, express) {
	var apiRoutes = express.Router();

	apiRoutes.get('/', function(req, res) {
		User.find({},'name password', function(err, users) {
			if (!err) {
				res.json(users);
			}else {
				console.log(err);
				res.json(err);
			}	
		});
	});
	
	apiRoutes.get('/:id', function(req, res) {
		var id = req.params.id;
		User.findOne({'_id': mongoose.Types.ObjectId(id)},'name password', function(err, users) {
			if (!err) {
				res.json(users);
			}else {
				console.log(err);
				return res.json(err);
			}	
		});
	});

	app.use('/api/user/' + app.locals.api_version, apiRoutes);
};

//module.exports = function(app) {
//	app.get('/api/user', function(req, res) {
//		db.find('user',{},{},{},10,function(err, users) {
//			if (!err) {
//				return res.json(users);
//			} else {
//				return console.log(err);
//			}
//		});
//	});
//
//	app.get('/api/user/:id', function(req, res){
//		var id = req.params.id;
//		db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
//			if (!err) {
//				//console.log('look up user.email = %j',user.email);
//				return res.json(user);
//			} else {
//				return console.log(err);
//			}
//		});
//	});
//	
//	app.post('/api/user', function(req, res){
//		db.save('user', req.body);
//		res.json(req.body);
//	});
//	
//	app.put('/api/user', function(req, res){
//		var id = req.body._id;
//		console.log('editing user id =' + id);
//		delete req.body['_id'];
//		db.update('user',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
//			function(){
//				res.json(req.body);
//		});
//	});
//	
//	app.delete('/api/user/:id', function(req, res){
//		var id = req.params.id;
//		
//		db.remove('user', {'_id': mongojs.ObjectId(id)}, function(err, user){
//			if (!err) {
//				res.json(true);
//			} else {
//				console.log(err);
//				res.json(false);
//			}
//		});
//	});
//
//};