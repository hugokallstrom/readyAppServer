var database = require('./database');

// GET /user/{userId}
exports.getUser = function (req, res, next) {
	console.log('Finding: ' + req.params.userId);
	database.findUser(req.params.userId, function (err, obj) {
		if(obj != null) {
			user = obj.toObject();
			console.log("found user: " + user);
			user = removeFields(user);
			res.send(200, user);
		} else {
			console.log("Not found");
			res.send(404, {"error": err});			
		}
	});
}

// POST /user/{userId}	
exports.register = function (req, res, next) {
	console.log("Registering")
	console.log("req: " + req.body);
	console.log("jbody: " + JSON.parse(req.body));
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
	return user
}