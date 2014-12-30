exports = module.exports = {};
var mongoose = require('mongoose');
var User = require('./userSchema');
var uriString = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/readyAppDB';

mongoose.connect(uriString, function(err) {
	if(err) 
		console.log("err");
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});

function createUser (jbody) {
	var user = new User();
	user.name = jbody.name;
	user.lastName = jbody.lastName;
	user.email = jbody.email;
	user.userId = jbody.userId;
	user.password = jbody.password;
	user.profilePicture = "Not specified";
	user.lastOnline = "Never";
	user.yourFriend = false;
	return user;
}

var addUserToDB = function (jbody, callback) {
	findUser(jbody.userId, function (err, obj) {
		if (obj === null) {
			var user = createUser(jbody);		
			user.save(function (err) {
				if(err) return callback("Error when saving to database", null);
				callback(null, user);
			});
		} else {
			callback("User exists", null);
		}
	});
}

var findUser = function (username, callback) {
	User.findOne({ userId: username }, function (err, user) {
		if(err) return callback("Not found", null);
		if(user == null) return callback("Not found", null);
		callback(null, user);
	});
}

var addFriend = function (username, friendName, callback) {
	findUser(username, function (err, user) {
		if(err) return callback("Not found", null);
		user.friendList.push({ friendId: friendName });
		user.save(function (err) {
			if(err) return callback("Error when saving to database", null);
			callback(null, friendName);
		});
	});
}

// Test purpose
var clearUsers = function () {
	User.remove({}, function (err) {});
}

module.exports = {
	addUserToDB: addUserToDB,
	findUser: findUser,
	clearUsers: clearUsers,
	addFriend: addFriend
}