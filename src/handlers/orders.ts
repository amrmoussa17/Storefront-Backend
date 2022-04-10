import { Request, Response, NextFunction } from 'express'
import OrderStore from '../models/order'

const store = new OrderStore()

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await store.create(req.body)
    res.json({
      status: 'ok',
      data: order,
      message: 'order created successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await store.addProduct(req.body)
    res.json({
      status: 'ok',
      data: orderProduct,
      message: 'product added to order successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getCurrentOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id
    const currentOrder = await store.getCurrentOrder(userId)
    res.json({
      status: 'ok',
      data: currentOrder,
      message: `current order by user: ${userId} retrieved successfully`
    })
  } catch (error) {
    next(error)
  }
}
