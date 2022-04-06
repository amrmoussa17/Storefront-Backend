import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET
} = process.env

const config = {
  host: POSTGRES_HOST as string,
  port: parseInt(POSTGRES_PORT as string),
  database: NODE_ENV === 'dev' ? (POSTGRES_DB as string) : (POSTGRES_DB_TEST as string),
  user: POSTGRES_USER as string,
  password: POSTGRES_PASSWORD as string,
  pepper: BCRYPT_PASSWORD as string,
  saltRounds: parseInt(SALT_ROUNDS as string),
  tokenSecret: TOKEN_SECRET as string
}

export default config
