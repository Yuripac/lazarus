import LocalStrategy from 'passport-local'
import UserModel from '../src/models/user_model.js'

function config(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'user[email]', passwordField: 'user[password]' },
      (email, password, done) => {
        const userModel = new UserModel().getInstance()
        userModel.findOne({ email }, (err, user) => {
          if (err) return done(err)

          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorret password' })
          }

          return done(null, user)
        })
      }
    )
  )
}

export default config
