import { Request, Response, NextFunction } from 'express'
import ProductStore from '../models/product'

const store = new ProductStore()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await store.create(req.body)
    res.json({
      status: 'ok',
      data: { ...product },
      message: 'product created successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await store.show(req.params.id)
    res.json({
      status: 'ok',
      data: { ...product },
      message: `product retrieved successfully`
    })
  } catch (error) {
    next(error)
  }
}
export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await store.index()
    res.json({
      status: 'ok',
      data: products,
      message: `products retrieved successfully`
    })
  } catch (error) {
    next(error)
  }
}
