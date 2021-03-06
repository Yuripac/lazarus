import passport from 'passport'
import passportConfig from '../config/passport.js'
import jwt from 'express-jwt'

class Authentication {
  authenticate(callback) {
    passportConfig(passport)
    return passport.authenticate('local', { session: false }, callback)
  }

  required() {
    return this.jwtConfig()
  }

  optional() {
    return this.jwtConfig({ credentialsRequired: false })
  }

  jwtConfig(config = {}) {
    return jwt(
      Object.assign(
        {
          secret: process.env.JWT_SECRET,
          userProperty: 'payload',
          algorithms: ['HS256'],
          getToken: this.getTokenFromHeader,
        },
        config
      )
    )
  }

  getTokenFromHeader(req) {
    const {
      headers: { authorization },
    } = req

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1]
    }
    return null
  }
}

export default new Authentication()
