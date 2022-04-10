import ProductStore from '../../models/product'
import client from '../../database'
import { Product } from '../../helpers/types'

const store = new ProductStore()

describe('test product model', () => {
  describe('test product model methods is defined', () => {
    it('create method is defined', () => {
      expect(store.create).toBeDefined()
    })
    it('show method is defined', () => {
      expect(store.show).toBeDefined()
    })
    it('index method is defined', () => {
      expect(store.index).toBeDefined()
    })
  })

  describe('test product model logic', () => {
    const product: Product = {
      product_name: 'product test',
      price: 5000
    }

    beforeAll(async () => {
      const productTest = await store.create(product)
      product.id = productTest.id
    })

    afterAll(async () => {
      const conn = await client.connect()
      await conn.query('DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;')
      conn.release()
    })

    it('test create method logic', async () => {
      const productTest2 = await store.create({
        product_name: 'product test 2',
        price: 20000
      })
      expect(productTest2).toEqual({
        id: productTest2.id,
        product_name: 'product test 2',
        price: 20000
      })
    })

    it('test show method logic', async () => {
      const showedProduct = await store.show(product.id as unknown as string)
      expect(showedProduct).toEqual(product)
    })

    it('test index method logic', async () => {
      const users = await store.index()
      expect(users.length).toEqual(2)
    })
  })
})
