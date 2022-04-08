import { Request, Response, NextFunction } from 'express'
import OrderProductStore from '../models/order-product'

const store = new OrderProductStore()

export const createOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await store.create(req.body)
    res.json({
      status: 'ok',
      data: orderProduct,
      message: 'order product created successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const updateOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await store.edit(req.body)
    res.json({
      status: 'ok',
      data: orderProduct,
      message: 'order product updated successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await store.deleteProduct(req.params.order, req.params.product)
    res.json({
      status: 'ok',
      data: orderProduct,
      message: 'product in order deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await store.deleteAll(req.params.order)
    res.json({
      status: 'ok',
      data: orderProduct,
      message: 'products within order deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
