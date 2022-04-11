import app from '../../index'
import supertest from 'supertest'
import client from '../../database'
import UserStore from '../../models/user'
import ProductStore from '../../models/product'
import { User, Product } from '../../helpers/types'

const userStore = new UserStore()
const productStore = new ProductStore()

// create a request object
const request = supertest(app)

const user1: User = {
  username: 'user 1',
  first_name: 'user 1',
  last_name: 'test 1',
  email: 'user1@test.com',
  user_password: 'pass123'
}
const product1: Product = {
  product_name: 'microwave',
  price: 4500
}

let token = ''

describe('test products endpoint response', () => {
  beforeAll(async () => {
    await userStore.create(user1)
    await productStore.create(product1)

    const response = await request
      .post('/api/users/authenticate')
      .set('content-type', 'application/json')
      .send({
        email: 'user1@test.com',
        password: 'pass123'
      })

    token = response.body.data.token
    expect(token).toBeTruthy
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query(
      'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    )
    conn.release()
  })

  it('test products create api', async () => {
    const response = await request
      .post('/api/products')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_name: 'ipad',
        price: 15000
      })
    const { id, product_name, price } = response.body.data
    expect(response.status).toBe(200)
    expect(id).toBe(2)
    expect(product_name).toBe('ipad')
    expect(price).toBe(15000)
  })
  it('test products index api', async () => {
    const response = await request.get('/api/products')

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(2)
  })
  it('test products show api', async () => {
    const response = await request.get('/api/products/1')
    const { id, product_name, price } = response.body.data
    expect(response.status).toBe(200)
    expect(id).toBe(1)
    expect(product_name).toBe('microwave')
    expect(price).toBe(4500)
  })
})
