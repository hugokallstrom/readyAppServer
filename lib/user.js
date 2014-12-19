var database = require('./database');

// GET /user/{userId}
exports.getUser = function (req, res, next) {
	console.log('Finding: ' + req.params.userId);
	database.findUser(req.params.userId, function (err, obj) {
		if(obj != null) {
			user = obj.toObject();
			console.log("found user: " + user);
			res.send(200, user);
		} else {
			console.log("Not found");
			res.send(404, {"error": err});			
		}
	});
}
// POST /user/{userId}
exports.register = function (req, res, next) {
	database.addUserToDB(JSON.parse(req.body), function(err, user) {
		if(err) {
			res.send(404, err);
		} else {
			console.log("added user:" + user);
			res.send(200);
		}
	});
}