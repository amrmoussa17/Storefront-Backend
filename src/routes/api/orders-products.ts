import express from 'express'
import * as handlers from '../../handlers/orders-products'

const ordersProducts = express.Router()

ordersProducts.route('/').post(handlers.createOrderProduct).patch(handlers.updateOrderProduct)
ordersProducts.route('/del/order/:order').delete(handlers.deleteAll)
ordersProducts.route('/del/order/:order/product/:product').delete(handlers.deleteProduct)

export default ordersProducts
