const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

const Users = mongoose.model("User");

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "UserName",
        passwordField: "password"
      },
      (UserName, password, done) => {
        Users.findOne({
          UserName: UserName
        })
          .then(user => {
            if (!user || !user.validatePassword(password)) {
              return done(null, false, {
                errors: {
                  "username or password": "is invalid"
                }
              });
            }
            return done(null, user);
          })
          .catch(done);
      }
    )
  );
};
