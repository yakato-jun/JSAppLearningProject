'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/query');

const strategies = {};

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

strategies.local = new LocalStrategy(
  { usernameField: 'userid', passwordField: 'password'},
  async (userid, password, done) => {
    console.log('userid: ' + userid + ', password: ' + password);
    try {
      const user_info = await db.findUserById(userid);

      if (!user_info) {
        return done(null, false, { message: 'Incorrect userid.' });
      }

      const hashedPassword = await hashPassword(password);
      if (bcrypt.compare(password, user_info.password) === false) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user_info);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use('local', strategies.local);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userid, done) => {
  try {
    const user_info = await db.findUserById(userid);
    done(null, user_info);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;