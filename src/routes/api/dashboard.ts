import express from 'express'
import * as handlers from '../../handlers/dashboard'
import validateToken from '../../middlewares/authentication'

const dashboard = express.Router()

dashboard.route('/currentorder/user/:id').get(validateToken, handlers.getCurrentOrder)
dashboard.route('/topfive').get(handlers.getTopProducts)

export default dashboard
