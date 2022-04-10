import UserStore from '../../models/user'
import client from '../../database'
import { User } from '../../helpers/types'

const store = new UserStore()

describe('test user model', () => {
  describe('test user model methods is defined', () => {
    it('create method is defined', () => {
      expect(store.create).toBeDefined()
    })
    it('show method is defined', () => {
      expect(store.show).toBeDefined()
    })
    it('index method is defined', () => {
      expect(store.index).toBeDefined()
    })
    it('authenticate method is defined', () => {
      expect(store.authenticate).toBeDefined()
    })
  })

  describe('test user model logic', () => {
    const user: User = {
      username: 'user1',
      first_name: 'user1',
      last_name: 'test1',
      email: 'user1@test.com',
      user_password: 'user123'
    }

    beforeAll(async () => {
      const userTest = await store.create(user)
      user.id = userTest.id
    })

    afterAll(async () => {
      const conn = await client.connect()
      await conn.query('DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
      conn.release()
    })

    it('test create method logic', async () => {
      const userTest2 = await store.create({
        username: 'user2',
        first_name: 'user2',
        last_name: 'test2',
        email: 'user2@test.com',
        user_password: 'user456'
      })
      expect(userTest2).toEqual({
        id: userTest2.id,
        username: 'user2',
        first_name: 'user2',
        last_name: 'test2',
        email: 'user2@test.com'
      })
    })

    it('test show method logic', async () => {
      const showedUser = await store.show(user.id as unknown as string)
      expect(showedUser).toEqual({
        id: user.id,
        username: 'user1',
        first_name: 'user1',
        last_name: 'test1',
        email: 'user1@test.com'
      })
    })

    it('test index method logic', async () => {
      const users = await store.index()
      expect(users.length).toEqual(2)
    })
    it('test authenticate method logic with right credentials', async () => {
      const userAuth = await store.authenticate(user.email, user.user_password as string)
      expect(userAuth).toEqual({
        id: user.id,
        username: 'user1',
        first_name: 'user1',
        last_name: 'test1',
        email: 'user1@test.com'
      })
    })
    it('test authenticate method logic with wrong credentials', async () => {
      const userAuth = await store.authenticate('user2@test.com', 'user789')
      expect(userAuth).toBeNull
    })
  })
})
