import express from 'express'
import * as handlers from '../../handlers/products'
import validateToken from '../../middlewares/authentication'
const products = express.Router()

products.route('/').get(handlers.index).post(validateToken, handlers.create)
products.route('/:id').get(handlers.show)

export default products
