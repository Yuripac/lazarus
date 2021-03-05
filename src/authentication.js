import passport from 'passport'
import passportConfig from '../config/passport.js'

class Authentication {
  authenticate(callback) {
    passportConfig(passport)
    return passport.authenticate('local', { session: false }, callback)
  }
}

export default Authentication
