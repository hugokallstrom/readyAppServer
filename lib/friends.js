var database = require('./database');

// GET /friends/{userId}
exports.getFriendList = function (req, res, next) {
	console.log('Finding: ' + req.params.userId);
	database.findUser(req.params.userId, function (err, obj) {
		if(obj != null) {
			user = obj.toObject();
			console.log("found " + user + " friend list");
			user = removeFields(user);
			res.send(200, user.friendList);
		} else {
			res.send(404, {"error": err});			
		}
	});
}

// POST /friends/{userId}/{friendId}
exports.addFriend = function (req, res, next) {
//	console.log('Finding friend: ' + req.params.friendId);
	database.findUser(req.params.friendId, function (err, obj) {
		if(obj != null) {
			user = obj.toObject();
			database.addFriend(req.params.userId, req.params.friendId, function (err, friend){
				
				database.addFriend(req.params.friendId, req.params.userId, function (err, friend2){
		//		console.log("Added friend ");
				res.send(200, {"userId": friend});
				});
			});
		} else {
			res.send(404, {"error": err});			
		}
	});
}

function removeFields(user) {
	delete user.__v
	delete user._id

	for(var i = 0; i < user.friendList.length; i++) {
	    delete user.friendList[i]._id
	}

	return user
}