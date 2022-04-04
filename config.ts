import dotenv from 'dotenv'

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
  port: POSTGRES_PORT,
  db: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
}
