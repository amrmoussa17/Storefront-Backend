import { Pool } from 'pg'
import config from './config'

const client = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password
})

export default client
