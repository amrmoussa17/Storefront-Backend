import express from 'express'
import * as handlers from '../../handlers/orders'

const orders = express.Router()

orders.route('/').post(handlers.createOrder).patch(handlers.editOrder)
orders.route('/:id').get(handlers.deleteOrder)

export default orders
