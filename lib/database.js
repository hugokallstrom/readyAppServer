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

var addUserToDB = function (jbody, callback) {
	console.log("Finding " + jbody.userId)
	findUser(jbody.userId, function (err, obj) {
		if (obj === null) {
			var user = createUser(jbody);		
			user.save(function (err) {
				if(err) callback("Error when saving to database", null);
				callback(null, user);
			});
		} else {
			callback("User exists", null);
		}
	});
}

function createUser (jbody) {
	var user = new User();
	user.name = jbody.name;
	user.lastName = jbody.lastName;
	user.email = jbody.email;
	user.userId = jbody.userId;
	user.password = jbody.password;
	user.profilePicture = "Not specified";
	user.friendsList = "Not specified";
	user.lastOnline = "Never";
	user.yourFriend = false;
	return user;
}

var findUser = function (param, callback) {
	User.findOne({ userId: param }, function (err, obj) {
		if(err) return callback("Not found", null);
		if(obj == null) return callback("Not found", null);
		callback(err, obj);
	});
}

// Test purpose
var clearUsers = function () {
	User.remove({}, function (err) {});
}

module.exports = {
	addUserToDB: addUserToDB,
	findUser: findUser,
	clearUsers: clearUsers
}
