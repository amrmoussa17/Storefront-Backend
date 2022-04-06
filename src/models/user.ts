import config from '../config'
import client from '../database'
import bcrypt from 'bcrypt'

type User = {
  id?: number
  username: string
  first_name: string
  last_name: string
  email: string
  password?: string
}

// using bcrypt module to hash user's password
const hashPass = (pass: string) => {
  return bcrypt.hashSync(`${pass}${config.pepper}`, config.saltRounds)
}

export default class UserStore {
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (username, first_name, last_name, email, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, first_name, last_name, email'
      const result = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        hashPass(u.password as string)
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't create new user ${error}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, username, first_name, last_name, email FROM users WHERE id= $1'
      const result = await conn.query(sql, [id])
      conn.release()
      if (!result.rows.length) {
        throw new Error(`user ${id} does not exist`)
      }
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't get user: ${id} ${error}`)
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, username, first_name, last_name, email FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`couldn't retreive users ${error}`)
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT user_password FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])
      if (result.rows.length) {
        const { user_password: hashedpass } = result.rows[0]
        if (bcrypt.compareSync(`${password}${config.pepper}`, hashedpass)) {
          const sql =
            'SELECT id, username, first_name, last_name, email FROM users WHERE email=($1)'
          const result = await conn.query(sql, [email])
          conn.release()
          return result.rows[0]
        }
      }
      conn.release()
      return null
    } catch (error) {
      throw new Error(`couldn't authorizate user ${error}`)
    }
  }
}
