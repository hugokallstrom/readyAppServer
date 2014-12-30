var database = require('./database');

// GET /friends/{userId}
exports.getFriendList = function (req, res, next) {
	console.log('Finding: ' + req.params.userId);
	database.findUser(req.params.userId, function (err, obj) {
		if(obj != null) {
			user = obj.toObject();
			console.log("found user: " + user);
			res.send(200, user.friendList);
		} else {
			console.log("Not found");
			res.send(404, {"error": err});			
		}
	});
}

// POST /friends/{userId}/{friendId}
exports.addFriend = function (req, res, next) {
	console.log('Finding friend: ' + req.params.friendId);
	database.findUser(req.params.friendId, function (err, obj) {
		if(obj != null) {
			database.addFriend(req.params.userId, req.params.friendId, function (){
				
			});
			user = obj.toObject();
			console.log("found user: " + user);

			res.send(200, user.friendList);
		} else {
			console.log("Not found");
			res.send(404, {"error": err});			
		}
	});
}