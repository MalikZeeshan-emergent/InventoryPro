import { Router, Request, Response } from 'express'
import { salesService } from '../services/salesService'
import { authenticate, authorize } from '../middleware/auth'
import { body, validationResult } from 'express-validator'

const router = Router()

const parseIdParam = (value: string | string[] | undefined): number => {
  if (Array.isArray(value)) value = value[0]
  return parseInt(value || '0', 10)
}

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const filters = {
      status: typeof req.query.status === 'string' ? req.query.status : undefined,
      customer_id: req.query.customer_id ? parseInt(req.query.customer_id as string, 10) : undefined,
      date_from: typeof req.query.date_from === 'string' ? req.query.date_from : undefined,
      date_to: typeof req.query.date_to === 'string' ? req.query.date_to : undefined,
    }
    const orders = await salesService.getAll(filters)
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    const order = await salesService.getById(id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', authenticate, authorize('admin', 'super_admin', 'manager', 'sales_rep'), [
  body('customer_id').isInt(),
  body('items').isArray({ min: 1 })
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const authReq = req as any
    const order = await salesService.create({
      ...req.body,
      created_by: authReq.user.id
    })
    res.status(201).json(order)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id/status', authenticate, authorize('admin', 'super_admin', 'manager'), async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    const order = await salesService.updateStatus(id, req.body.status)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router