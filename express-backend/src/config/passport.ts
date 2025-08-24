import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { fetchUserDataFromId, fetchUserDataFromUsername } from '../db/queries';
import IncorrectCredentialError from '../errors/IncorrectCredentialError';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await fetchUserDataFromUsername(username);

      if (!user) {
        done(null, false, { message: 'Credential incorrect.' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        done(null, false, { message: 'Credential incorrect.' });
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<number>(async (id, done) => {
  try {
    const user = await fetchUserDataFromId(id);

    if (!user) {
      done(new IncorrectCredentialError('Credential not match'), null);
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
