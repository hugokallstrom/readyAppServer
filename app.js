var restify = require('restify');
var restifyOauth2 = require('restify-oauth2');
var user = require('./lib/user.js');
var friends = require('./lib/friends.js');
var auth = require('./lib/auth.js');

var server = restify.createServer({
	name: 'ReadyApp',
});

server.use(passport.initialize());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

// Routes
server.post('/login', user.authenticate);
server.get('/user/:userId', user.getUser);
server.post('/user/:userId', user.register);
server.post('/register', user.register);
server.get('/friends/:userId', friends.getFriendList)
server.post('/friends/:userId/:friendId', friends.addFriend)



server.listen(process.env.PORT || 8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});