import crypto from 'crypto'

class PasswordEncryptor {
  salt() {
    return crypto.randomBytes(16).toString('hex')
  }

  encrypt(password, salt) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 100, 'sha512')
      .toString('hex')
  }
}

export default PasswordEncryptor
