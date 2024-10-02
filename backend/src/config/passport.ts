import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {findUserByEmail} from '../services/users.services'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await findUserByEmail(email)

    if (!user) {
      return done(null, false, {message: 'Incorrect email or password'})
    }

    const isValid = await user?.comparePassword(password)
    if (!isValid) {
      return done(null, false, {message: 'Incorrect email or password'})
    }

    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))