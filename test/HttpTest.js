var assert = require('assert')	;
var expect = require('chai').expect
var supertest = require('supertest');
var database = require('../lib/database.js');
var jsonBodies = require('./jsonTestBodies.js');
var server = require('../app.js');

describe('http /user', function () {
	before(function (done) {
		var testUser = jsonBodies.createTestRegisterRequest('Johan', 'Edeljung', 'johanede@gmail.com', 'johan123');
		var testUser2 = jsonBodies.createTestRegisterRequest('Markus', 'Sköld', 'macke@gmail.com', 'macke123');
		database.addUserToDB(testUser, function (err, user) {
			if(err) return console.log(err);
			database.addUserToDB(testUser2, function (err, user) {
				//server.start(); 	
				done();
			});
		});
	});

	after(function (done)) {
		//server.close();
		done();
	}

	


});