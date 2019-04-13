const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'password',
}, (UserName, password, done) => {
  Users.findOne({"UserName": UserName })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'username or password': 'is invalid' } });
        
      }
      return done(null, user);
    }).catch(done);
}));
/*
passport.use('local-login', new LocalStrategy(
  function(UserName, password, done) {
    User.findOne({ "UserName" : UserName }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
*/