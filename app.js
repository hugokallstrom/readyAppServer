var restify = require('restify');
var user = require('./lib/user.js');

var server = restify.createServer({
	name: 'ReadyApp',
});
server.use(restify.bodyParser());

// Routes
server.get('/user/:userId', user.getUser);
server.post('/user/:userId', user.register);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
