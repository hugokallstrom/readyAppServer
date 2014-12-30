var assert = require('assert')
var expect = require('chai').expect
var database = require('../lib/database')
var jsonBodies = require('./jsonTestBodies')

describe('Friend', function () {
	before(function (done) {
		addTestUsers(function () {
			done();
		});
	});

	after(function (done) {
		database.clearUsers();
		done();
	}); 

	describe('#addFriend()', function () {
		it('should return the friend if successfully added', function (done) {
			database.addFriend('johan123', 'macke', function (err, friend) {
				expect(friend).to.equal('macke');
				done();
			});
		});

		it('should append added friend to users friendlist', function (done) {
			database.addFriend('johan123', 'macke', function (err, friend) {
				database.findUser('johan123', function (err, obj) {
					user = obj.toObject();
					expect('macke').to.equal(user.friendList[1].friendId);
				});
			});

			database.addFriend('johan123', 'asterb', function (err, friend) {
				database.findUser('johan123', function (err, obj) {
					user = obj.toObject();
					expect('asterb').to.equal(user.friendList[2].friendId);
					done();
				});
			});
		});

		it('should return "no user found"-error if user does not exist', function (done) {
			database.addFriend('johan123', 'noUser' function (err, obj) {
				expect(err).to.equal('Not found')
			});

			done();
		});

	});

});

function addTestUsers (callback) {
	var testUser = jsonBodies.createTestRegisterRequest('johan', 'edeljung', 'jj@gmail.com', 'johan123');
	database.addUserToDB(testUser, function (err, user) {
		if(err) return console.log(err);
		testUser2 = jsonBodies.createTestRegisterRequest('marckus', 'sköld', 'ms@gmail.com', 'macke');
		database.addUserToDB(testUser2, function (err, user) {
			if(err) return console.log(err);
			testUser3 = jsonBodies.createTestRegisterRequest('aster', 'boter', 'ab@gmail.com', 'asterb');
			database.addUserToDB(testUser3, function (err, user) {
				if(err) return console.log(err);
				callback();
			});
		});
	});
}
