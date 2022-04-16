import client from '../database'
import { Product } from '../helpers/types'

// database products CRUD actions
export default class ProductStore {
  // create new product
  async create(product: Product) {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (product_name, price) VALUES ($1, $2) returning *'
      const result = await conn.query(sql, [product.product_name, product.price])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not create new product ${error}`)
    }
  }

  // show product by id
  async show(id: string) {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=$1'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`could not retrieve product: ${id} ${error}`)
    }
  }

  // show products
  async index() {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`could not retrieve all products ${error}`)
    }
  }
}
