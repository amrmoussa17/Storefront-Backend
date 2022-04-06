import express from 'express'
import * as handlers from '../../handlers/products'

const products = express.Router()

products.route('/').get(handlers.index).post(handlers.create)
products.route('/:id').get(handlers.show)

export default products
