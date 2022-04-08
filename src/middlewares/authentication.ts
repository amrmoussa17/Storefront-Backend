import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, config.tokenSecret)
    next()
  } catch (err) {
    return res.status(401).json(`Access denied, invalid token, ${err}`)
  }
}

export default validateToken
