import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../config/database'

export const authService = {
  async register(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, role',
      [email, hashedPassword, name]
    )
    return result.rows[0]
  },

  async login(email: string, password: string) {
    const result = await query(
      'SELECT id, email, password, name, role FROM users WHERE email = $1 AND is_active = true',
      [email]
    )
    if (result.rows.length === 0) {
      throw new Error('Invalid credentials')
    }

    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' } as jwt.SignOptions
    )

    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token }
  },

  async getUserById(id: number) {
    const result = await query(
      'SELECT id, email, name, role, is_active, created_at FROM users WHERE id = $1',
      [id]
    )
    return result.rows[0]
  },

  async updatePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await query('SELECT password FROM users WHERE id = $1', [userId])
    if (user.rows.length === 0) throw new Error('User not found')

    const isValid = await bcrypt.compare(oldPassword, user.rows[0].password)
    if (!isValid) throw new Error('Invalid old password')

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [hashedPassword, userId])
    return { message: 'Password updated successfully' }
  }
}