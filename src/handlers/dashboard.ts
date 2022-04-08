import DashboardQueries from '../services/dashboard'
import { Request, Response, NextFunction } from 'express'

const dashboard = new DashboardQueries()

// get current order by user
export const getCurrentOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id
    const currentOrder = await dashboard.getCurrentOrder(userId)
    console.log(currentOrder)
    res.json({
      status: 'ok',
      data: currentOrder,
      message: `current order by user: ${userId} retrieved successfully`
    })
  } catch (error) {
    next(error)
  }
}
