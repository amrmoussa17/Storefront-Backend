import client from '../database'

interface Order {
  id?: number
  user_id: number
  order_status: string
}

export default class OrderStore {
  // create order
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO Orders (user_id, order_status) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [o.user_id, o.order_status])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't create new order, ${error}`)
    }
  }

  // update order status
  async edit(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'UPDATE orders SET order_status=$1 WHERE id=$2 RETURNING *'
      const result = await conn.query(sql, [o.order_status, o.id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not update order ${o.id} for user ${o.user_id}`)
    }
  }

  // delete order
  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not delete order ${id}`)
    }
  }
}
