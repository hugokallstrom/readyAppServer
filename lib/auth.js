passport = require('passport');
BasicStrategy = require('passport-http').BasicStrategy;
var User = require('./userSchema');

passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ userId: userid }, function (err, user) {
      console.log("finding user: " + userid);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password, user.password)) { return done(null, false); }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return done(err); }

        // Password did not match
        if (!isMatch) { return done(null, false); }

        // Success
        return done(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });    