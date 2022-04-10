import app from '../../index'
import supertest from 'supertest'
import client from '../../database'
import UserStore from '../../models/user'
import { User } from '../../helpers/types'
import users from '../../routes/api/users'

const userStore = new UserStore()
// create a request object
const request = supertest(app)
let token = ''
const user1: User = {
  username: 'user 1',
  first_name: 'user 1',
  last_name: 'test 1',
  email: 'user1@test.com',
  user_password: 'pass123'
}
const user2: User = {
  username: 'user 2',
  first_name: 'user 2',
  last_name: 'test 2',
  email: 'user2@test.com',
  user_password: 'pass456'
}

describe('test users endpoint response', () => {
  beforeAll(async () => {
    await userStore.create(user1)
    await userStore.create(user2)
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    conn.release()
  })

  it('test users create api', async () => {
    const response = await request.post('/api/users').set('content-type', 'application/json').send({
      username: 'amr',
      first_name: 'amr',
      last_name: 'moussa',
      email: 'amr@test.com',
      user_password: '123'
    })
    const { username, first_name, last_name, email } = response.body.data
    expect(response.status).toBe(200)
    expect(username).toBe('amr')
    expect(first_name).toBe('amr')
    expect(last_name).toBe('moussa')
    expect(email).toBe('amr@test.com')
  })

  it('test users authenticate api with correct login credentials', async () => {
    const response = await request
      .post('/api/users/authenticate')
      .set('content-type', 'application/json')
      .send({
        email: 'user1@test.com',
        password: 'pass123'
      })
    const { username, first_name, last_name, email, token: myToken } = response.body.data
    token = myToken
    expect(response.status).toBe(200)
    expect(token).toBeTruthy
    expect(username).toBe('user 1')
    expect(first_name).toBe('user 1')
    expect(last_name).toBe('test 1')
    expect(email).toBe('user1@test.com')
  })
 
  it('test users authenticate api with correct login credentials', async () => {
    const response = await request
      .post('/api/users/authenticate')
      .set('content-type', 'application/json')
      .send({
        email: 'elsayed@test.com',
        password: '987'
      })
    expect(response.status).toBe(401)
  })

  it('test users index api ', async () => {
    const response = await request
      .get('/api/users/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(3)
  })

  it('test users show api', async () => {
    const response = await request
      .get(`/api/users/1`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    const { username, first_name, last_name, email }  = response.body.data  
    expect(response.status).toBe(200)
    expect(username).toBe('user 1')
    expect(first_name).toBe('user 1')
    expect(last_name).toBe('test 1')
    expect(email).toBe('user1@test.com')
  })
})
