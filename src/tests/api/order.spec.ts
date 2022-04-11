import app from '../../index'
import supertest from 'supertest'
import client from '../../database'
import UserStore from '../../models/user'
import ProductStore from '../../models/product'
import OrderStore from '../../models/order'
import { User, Product, Order, OrderProduct } from '../../helpers/types'

const userStore = new UserStore()
const productStore = new ProductStore()
const orderStore = new OrderStore()

// create a request object
const request = supertest(app)

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
  user_password: 'pass987'
}
const product1: Product = {
  product_name: 'microwave',
  price: 4500
}
const product2: Product = {
  product_name: 'laptop',
  price: 15000
}
const product3: Product = {
  product_name: 'phone',
  price: 8000
}
const product4: Product = {
  product_name: 'xbox',
  price: 12000
}

const order1: Order = {
  user_id: 1,
  order_status: 'active'
}

const order2: Order = {
  user_id: 2,
  order_status: 'active'
}

let token = ''
describe('test orders endpoint response', () => {
  beforeAll(async () => {
    await userStore.create(user1)
    await userStore.create(user2)
    await productStore.create(product1)
    await productStore.create(product2)
    await productStore.create(product3)
    await productStore.create(product4)
    await orderStore.create(order1)
    await orderStore.create(order2)
    await orderStore.addProduct({
      order_id: 1,
      product_id: 1,
      quantity: 3
    })
    await orderStore.addProduct({
      order_id: 1,
      product_id: 2,
      quantity: 1
    })
    await orderStore.addProduct({
      order_id: 1,
      product_id: 3,
      quantity: 1
    })
    await orderStore.addProduct({
      order_id: 2,
      product_id: 1,
      quantity: 1
    })

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
      'DELETE FROM orders_products; \n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n  DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    )
    conn.release()
  })
  it('test orders create api', async () => {
    const response = await request
      .post('/api/orders')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: 1,
        order_status: 'completed'
      })
    const { id, user_id, order_status } = response.body.data
    const createdId = id

    expect(response.status).toBe(200)
    expect(createdId).toBe(id)
    expect(user_id).toBe(1)
    expect(order_status).toBe('completed')
  })

  it('test add product api', async () => {
    const response = await request
      .post('/api/orders/add')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        order_id: 1,
        product_id: 4,
        quantity: 2
      })
    const { order_id, product_id, quantity } = response.body.data
    expect(response.status).toBe(200)
    expect(order_id).toBe(1)
    expect(product_id).toBe(4)
    expect(quantity).toBe(2)
  })

  it('test get current order api ', async () => {
    const response = await request
      .get('/api/orders/user/1')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data.length).toBe(4)
  })
})
