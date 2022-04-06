import client from '../database'

interface product {
  id?: number
  product_name: string
  price: number
}

export default class ProductStore {
  async create(product: product) {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (product_name, price) VALUES ($1, $2) returning *'
      const result = await conn.query(sql, [product.product_name, product.price])
      return result.rows[0]
    } catch (error) {
      throw new Error(`couldnt create new product ${error}`)
    }
  }

  async show(id: string) {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=$1'
      const result = await conn.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not retrieve product: ${id} ${error}`)
    }
  }

  async index() {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      return result.rows
    } catch (error) {
      throw new Error(`could not retreive all products ${error}`)
    }
  }
}
