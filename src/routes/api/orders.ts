import express from 'express'
import * as handlers from '../../handlers/orders'
import validateToken from '../../middlewares/authentication'

const orders = express.Router()

orders.post('/', validateToken, handlers.createOrder)
orders.post('/add', validateToken, handlers.addProduct)
orders.get('/user/:id', validateToken, handlers.getCurrentOrder)

export default orders
