import express from 'express'
import * as handlers from '../../handlers/users'

const users = express.Router()

users.route('/').get(handlers.index).post(handlers.create)
users.route('/:id').get(handlers.show)
users.route('/authenticate').post(handlers.authenticate)

export default users
