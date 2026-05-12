const express = require('express')
const server = express()

server.use(express.json())

// Health check
server.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Simple auth endpoint
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  if (email === 'admin@inventorypro.com' && password === 'admin123') {
    res.json({
      user: { id: 1, email, name: 'Admin User', role: 'super_admin' },
      token: 'demo-token-12345'
    })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

// Products endpoint
server.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'MacBook Pro', sku: 'LAP-001', price: 1999, stock: 45 },
    { id: 2, name: 'iPhone 15', sku: 'PHN-002', price: 999, stock: 8 },
    { id: 3, name: 'Samsung TV', sku: 'TV-003', price: 1099, stock: 28 },
  ])
})

// Sales endpoint
server.get('/api/sales', (req, res) => {
  res.json([
    { id: 1, number: 'INV-001', customer: 'Tech Solutions', total: 12450, status: 'paid' },
    { id: 2, number: 'INV-002', customer: 'Office Depot', total: 8320, status: 'pending' },
  ])
})

module.exports = server