const jwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const keys = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id).then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
