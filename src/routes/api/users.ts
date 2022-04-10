import express from 'express'
import * as handlers from '../../handlers/users'
import validateToken from '../../middlewares/authentication'
const users = express.Router()

users.route('/').get(validateToken, handlers.index).post(handlers.create)
users.route('/:id').get(validateToken, handlers.show)
users.route('/authenticate').post(handlers.authenticate)

export default users
