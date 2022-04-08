import express from 'express'
import * as handlers from '../../handlers/dashboard'

const dashboard = express.Router()

dashboard.route('/currentorder/user/:id').get(handlers.getCurrentOrder)
dashboard.route('/topfive').get(handlers.getTopProducts)

export default dashboard
