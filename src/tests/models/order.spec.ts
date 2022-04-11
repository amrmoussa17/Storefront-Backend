import OrderStore from '../../models/order'
import UserStore from '../../models/user'
import ProductStore from '../../models/product'
import client from '../../database'
import { Order, User, Product } from '../../helpers/types'

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

describe('test order model', () => {
  describe('test order model methods is defined', () => {
    it('create method is defined', () => {
      expect(orderStore.create).toBeDefined()
    })

    it('add product method is defined', () => {
      expect(orderStore.addProduct).toBeDefined()
    })

    it('get current order method is defined', () => {
      expect(orderStore.getCurrentOrder).toBeDefined()
    })
  })

  describe('test order model logic', () => {
    const user: User = {
      username: 'user1',
      first_name: 'user1',
      last_name: 'test1',
      email: 'user1@test.com',
      user_password: 'user123'
    }
    const product1: Product = {
      product_name: 'laptop',
      price: 5000
    }
    const product2: Product = {
      product_name: 'phone',
      price: 1000
    }

    beforeAll(async () => {
      await userStore.create(user)
      await productStore.create(product1)
      await productStore.create(product2)
    })

    afterAll(async () => {
      const conn = await client.connect()
      await conn.query(
        'DELETE FROM orders_products; \n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n  DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      )
      conn.release()
    })

    it('test create method logic', async () => {
      const orderTest: Order = await orderStore.create({
        user_id: 1,
        order_status: 'active'
      })
      const testID = orderTest.id
      expect(orderTest).toEqual({
        id: testID,
        user_id: 1,
        order_status: 'active'
      })
    })

    it('test add product method logic, add product 1 to order 1 by user 1', async () => {
      const orderProduct = await orderStore.addProduct({
        order_id: 1,
        product_id: 1,
        quantity: 2
      })
      expect(orderProduct.id).toBe(1)
      expect(orderProduct.order_id).toBe(1)
      expect(orderProduct.product_id).toBe(1)
      expect(orderProduct.quantity).toBe(2)
    })
    it('test add product method logic, add product 2 to order 1 by user 1', async () => {
      const orderProduct = await orderStore.addProduct({
        order_id: 1,
        product_id: 2,
        quantity: 4
      })
      expect(orderProduct.id).toBe(2)
      expect(orderProduct.order_id).toBe(1)
      expect(orderProduct.product_id).toBe(2)
      expect(orderProduct.quantity).toBe(4)
    })
    it('test get current order by user id method logic', async () => {
      const currentOrder = await orderStore.getCurrentOrder('1')
      expect(currentOrder.length).toBe(2)
      expect(currentOrder[0].product_name).toBe('laptop')
      expect(currentOrder[1].product_name).toBe('phone')
      expect(currentOrder[0].quantity).toBe(2)
      expect(currentOrder[1].quantity).toBe(4)
    })
  })
})
