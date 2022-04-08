import client from '../database'

interface OrderProduct {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}

export default class OrderProductStore {
  // create order product
  async create(o: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldn't create new orderProduct, ${error}`)
    }
  }

  // update quantity of a product inside an order
  async edit(o: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql =
        'UPDATE orders_products SET quantity=$1 WHERE order_id=$2 AND product_id=$3 RETURNING *'
      const result = await conn.query(sql, [o.quantity, o.order_id, o.product_id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `could not update quantity ${o.quantity} for product ${o.product_id} order ${o.order_id}`
      )
    }
  }

  // delete a product in order by product id
  async deleteProduct(orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders_products WHERE order_id=$1 AND product_id=$2 RETURNING *'
      const result = await conn.query(sql, [orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not delete product ${productId} in order ${orderId} `)
    }
  }

  // delete all order products by order id
  async deleteAll(id: string): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM orders_products WHERE order_id=$1 RETURNING *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`could not delete all product in order `)
    }
  }
}
