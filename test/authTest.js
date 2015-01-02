var assert = require('assert')	
var expect = require('chai').expect
var database = require('../lib/database')
var jsonBodies = require('./jsonTestBodies')
var auth = require('../lib/auth')

describe('/login', function () {
	before(function (done) {
		var testUser = jsonBodies.createTestRegisterRequest('Johan', 'Edeljung', 'johanede@gmail.com', 'johan123');
		database.addUserToDB(testUser, function (err, user) {
			if(err) return console.log(err);
		});
		done();
	});

	after(function (done) {
		database.clearUsers();
		done();
	}); 

	describe('#isAuthenticated()', function () {
		it('should let the user login if the correct user name and password is supplied', function (done) {	
			done();
		});

	});
});