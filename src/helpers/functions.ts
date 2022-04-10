import config from '../config'
import bcrypt from 'bcrypt'

// using bcrypt module to hash user's password
export const hashPass = (pass: string) => {
  return bcrypt.hashSync(`${pass}${config.pepper}`, config.saltRounds)
}
