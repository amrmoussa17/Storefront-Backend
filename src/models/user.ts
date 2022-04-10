import config from '../config'
import client from '../database'
import bcrypt from 'bcrypt'
import { User } from '../helpers/types'
import { hashPass } from '../helpers/functions'

// database users CRUD actions
export default class UserStore {
  // create a new user
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
        hashPass(u.user_password as string)
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't create new user ${error}`)
    }
  }

  // show a user by id
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

  // show all users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, username, first_name, last_name, email FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`couldn't retrieve all users ${error}`)
    }
  }

  // authenticate user login credentials
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
      throw new Error(`login error ${email}, ${error}`)
    }
  }
}
