import { Request, Response, NextFunction } from 'express'
import UserStore from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

const store = new UserStore()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await store.create(req.body)
    res.json({
      status: 'ok',
      data: { ...user },
      message: 'user created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await store.show(req.params.id)
    res.json({
      status: 'ok',
      data: { ...user },
      message: 'user retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await store.index()
    res.json({
      status: 'ok',
      data: users,
      message: 'users retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await store.authenticate(req.body.email, req.body.password)
    if (!user) {
      return res.status(401).json({ message: 'login error, Enter credentials correctly' })
    }
    const token = jwt.sign(user, config.tokenSecret)
    return res.json({
      status: 'ok',
      data: { ...user, token },
      message: 'authentication completed successfully'
    })
  } catch (error) {
    next(error)
  }
}
