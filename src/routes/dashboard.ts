import express from 'express'
import * as handlers from '../handlers/dashboard'

const dashboard = express.Router()

dashboard.route('/:id').get(handlers.getCurrentOrder)

export default dashboard
