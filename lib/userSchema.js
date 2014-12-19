var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userId: String,
	name: String,
	lastName: String,
	email: String,
	profilePicture: String,
	friendsList: String,
	lastOnline: String,
	yourFriend: Boolean,
	password: String
});

module.exports = mongoose.model('User', UserSchema);