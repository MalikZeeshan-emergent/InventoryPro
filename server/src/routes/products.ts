import { Router, Request, Response } from 'express'
import { productService } from '../services/productService'
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
      category: typeof req.query.category === 'string' ? req.query.category : undefined,
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      warehouse: typeof req.query.warehouse === 'string' ? req.query.warehouse : undefined,
    }
    const products = await productService.getAll(filters)
    res.json(products)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    const product = await productService.getById(id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', authenticate, authorize('admin', 'super_admin', 'manager'), [
  body('sku').notEmpty(),
  body('name').notEmpty(),
  body('cost_price').isNumeric(),
  body('selling_price').isNumeric()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const product = await productService.create(req.body)
    res.status(201).json(product)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.put('/:id', authenticate, authorize('admin', 'super_admin', 'manager'), async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    const product = await productService.update(id, req.body)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', authenticate, authorize('super_admin'), async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    await productService.delete(id)
    res.json({ message: 'Product deleted' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id/stock', authenticate, async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id)
    const stock = await productService.getStock(id)
    res.json(stock)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router