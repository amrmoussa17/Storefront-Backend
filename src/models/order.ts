import client from '../database'
import { Order, OrderProduct } from '../helpers/types'

export default class OrderStore {
  // create order
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO Orders (user_id, order_status) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [o.user_id as number, o.order_status])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't create new order, ${error}`)
    }
  }
  // create order product
  async addProduct(o: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't add products to order, ${error}`)
    }
  }
  // get current order by user
  // here I could have specified the payload to be an object type, but i opted to go with any type so that I can complete unit testing for this model (expect(currentOrder[0].product_name)
  async getCurrentOrder(userId: string): Promise<any[]> {
    try {
      const conn = await client.connect()
      const sql =
        "SELECT product_name, quantity FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE user_id=$1 AND order_status='active'"
      const result = await conn.query(sql, [userId])
      return result.rows
    } catch (error) {
      throw new Error(`could not get current order of user: ${userId} ${error}`)
    }
  }
}
