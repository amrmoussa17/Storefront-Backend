import dotenv from 'dotenv'
import pg, { Pool } from 'pg'

dotenv.config()

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env

const config = {
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
}

const client = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password
})

export default client
