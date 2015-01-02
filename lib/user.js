var database = require('./database');
var passport = require('passport');
var auth = require('./auth.js');

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
		if(obj != null) {
			user = obj.toObject();
			user = removeFields(user);
			res.send(200, user);
		} else {
			res.send(404, {"error": err});			
		}
	});
}

// POST /user/{userId}	
exports.register = function (req, res, next) {
	console.log("Registering")
	database.addUserToDB(JSON.parse(req.body), function(err, user) {
		if(err) {
			res.send(404, err);
		} else {
			console.log("added user:" + user);
			res.send(200);
		}
	});
}

exports.test = function (req, res, next) {
	res.send(200);
}

function removeFields(user) {
	delete user.password
	delete user.__v
	delete user._id
	console.log("user.friendList.length: " + user.friendList.length)
	if(user.friendList.length > 0) {
		for(var i = 0; i < user.friendList.length; i++) {
		    delete user.friendList[i]._id
		}
	}	
	return user
}