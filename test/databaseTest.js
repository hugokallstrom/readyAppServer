var assert = require('assert')	
var expect = require('chai').expect
var database = require('../lib/database')

describe('Database', function () {
	before(function (done) {
		var testUser = createTestRegisterRequest();
		database.addUserToDB(testUser, function (err, user) {
			if(err) return console.log(err);
		});
		done();
	});

	after(function (done) {
		database.clearUsers();
		done();
	}); 

	describe('#findUser()', function () {
		it('should return a null user if the user not exists', function (done) {	
			database.findUser("noUser", function (err, obj) {
				expect(obj).to.equal(null);
			});
			done();
		});

		it('should return error "Not found" if the user not exists', function (done) {
			database.findUser("noUser", function (err, obj) {
				expect(err).to.equal("Not found");
			});
			done();
		});

		it('should return user information if user is found', function (done) {
			database.findUser("johan123", function (err, obj) {
				expectedObject = createTestUserResponse();
				user = obj.toObject();
				expect(user.name).to.equal("Johan");
				expect(user.lastName).to.equal("Edeljung");
				expect(user.email).to.equal("johanede@gmail.com");
				expect(user.userId).to.equal("johan123");
				expect(user.password).to.equal("secret");
			});
			done();
		});

	});

});

function createTestRegisterRequest() {
	return json = {
		"name": "Johan", 
		"lastName": "Edeljung",
		"email": "johanede@gmail.com",
		"userId": "johan123",
		"password": "secret"
	}
}

function createTestUserResponse() {
	return json = {
		"userId": "johan123",
		"name": "Johan",
		"lastName": "Edeljung",
		"email": "johanede@gmail.com",
		"userId": "johan123",
		"profilePicture": "Not specified",
		"friendsList:": "Not specified",
		"lastOnline": "Never",
		"yourFriend": false
	}
}
