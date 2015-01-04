var database = require('./database');
var passport = require('passport');
var auth = require('./auth.js');
var validator = require('validator');

exports.authenticate = function (req, res, next) {
	console.log("login : " + req.user.userId);
	user = req.user.toObject();
	user = removeFields(user);
	res.send(200, user);
}

// GET /user/{userId}
exports.getUser = function (req, res, next) {
	console.log('Finding: ' + req.params.userId);
	database.findUser(req.params.userId, function (err, obj) {
		if(!obj) res.send(404, {"error": err});
		user = obj.toObject();
		user = removeFields(user);
		res.send(200, user);		
	});
}

exports.search = function (req, res, next) {
	database.searchForUser(req.params.userId, function (err, obj) {
		if(!obj) res.send(404, {"error": err});
		//user = obj.toObject();
		//user = removeFields(user);
		res.send(200, obj);
	});
}

// POST /user/{userId}	
exports.register = function (req, res, next) {
	console.log("Registering")
	var body = JSON.parse(req.body);
	if(!validator.isEmail(body.email)) { res.send(400, {"error": "Invalid Email"}); }
	database.addUserToDB(JSON.parse(req.body), function(err, user) {
		if(err) res.send(404, err);
		console.log("added user:" + user);
		res.send(200);
	});
}

function removeFields(user) {
	delete user.password
	delete user.__v
	delete user._id
	if(user.friendList.length > 0) {
		for(var i = 0; i < user.friendList.length; i++) {
		    delete user.friendList[i]._id
		}
	}	
	return user
}