import { Router, Request, Response } from 'express'
import { authService } from '../services/authService'
import { authenticate } from '../middleware/auth'
import { body, validationResult } from 'express-validator'

const router = Router()

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await authService.register(req.body.email, req.body.password, req.body.name)
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const result = await authService.login(req.body.email, req.body.password)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const authReq = req as any
    const user = await authService.getUserById(authReq.user.id)
    res.json(user)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

router.put('/password', authenticate, async (req: Request, res: Response) => {
  try {
    const authReq = req as any
    const result = await authService.updatePassword(authReq.user.id, req.body.oldPassword, req.body.newPassword)
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router