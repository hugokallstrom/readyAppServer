passport = require('passport');
BasicStrategy = require('passport-http').Strategy;
var User = require('./userSchema');

/*passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ userId: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));*/