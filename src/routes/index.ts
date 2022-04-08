import express from 'express'
import users from './api/users'
import products from './api/products'
import orders from './api/orders'
import ordersProducts from './api/orders-products'
import dashboard from './dashboard'

const routes = express.Router()

routes.use('/users', users)
routes.use('/products', products)
routes.use('/orders', orders)
routes.use('/ordersproducts', ordersProducts)
routes.use('/dashboard/currentorder/user', dashboard)

export default routes
