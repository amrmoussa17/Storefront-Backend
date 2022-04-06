import express from 'express'
import users from './api/users'
import products from './api/products'

const routes = express.Router()

routes.use('/users', users)
routes.use('/products', products)

export default routes
