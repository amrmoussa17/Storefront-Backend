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
export const editOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await store.edit(req.body)
    res.json({
      status: 'ok',
      data: order,
      message: 'order updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await store.delete(req.params.id)
    res.json({
      status: 'ok',
      data: order,
      message: 'order deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
