import client from '../database'

export default class DashboardQueries {
  // get current order by user
  async getCurrentOrder(userId: string): Promise<object[]> {
    try {
      const conn = await client.connect()
      const sql =
        "SELECT product_name, quantity FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE user_id=$1 AND order_status='active'"
      const result = await conn.query(sql, [userId])
      return result.rows
    } catch (error) {
      throw new Error(`could not get current order by user: ${userId} ${error}`)
    }
  }
  // get top 5 products
  async getTopProducts(): Promise<object[]> {
    try {
      const conn = await client.connect()
      const sql =
        "SELECT product_name, SUM(quantity) AS total FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE order_status='active' GROUP BY product_name ORDER BY total DESC LIMIT 5"
      const result = await conn.query(sql)
      return result.rows
    } catch (error) {
      throw new Error(`could not get top 5 products ${error}`)
    }
  }
}
