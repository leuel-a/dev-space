import _ from 'lodash'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { findUserByEmail } from '../services/users.services'

export default passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      const user = await findUserByEmail(email)

      if (!user) {
        throw new Error('Email or Password not correct')
      }

      const isValid = await user?.comparePassword(password)
      if (!isValid) {
        throw new Error('Email or Password not correct')
      }
      done(null, _.omit(user.toJSON(), ['password']))
    } catch (error) {
      done(error, false)
    }
  }),
)
