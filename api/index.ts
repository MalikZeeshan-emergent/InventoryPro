import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req
  
  if (url === '/api/health' || url?.includes('/api/health')) {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  } 
  else if (url === '/api/products') {
    res.json([
      { id: 1, name: 'MacBook Pro', sku: 'LAP-001', price: 1999, stock: 45 },
      { id: 2, name: 'iPhone 15', sku: 'PHN-002', price: 999, stock: 8 },
      { id: 3, name: 'Samsung TV', sku: 'TV-003', price: 1099, stock: 28 },
    ])
  }
  else if (url === '/api/sales') {
    res.json([
      { id: 1, number: 'INV-001', customer: 'Tech Solutions', total: 12450, status: 'paid' },
      { id: 2, number: 'INV-002', customer: 'Office Depot', total: 8320, status: 'pending' },
    ])
  }
  else if (url?.includes('/api/auth/login')) {
    const { email, password } = req.body || {}
    if (email === 'admin@inventorypro.com' && password === 'admin123') {
      res.json({
        user: { id: 1, email, name: 'Admin User', role: 'super_admin' },
        token: 'demo-token-12345'
      })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  }
  else {
    res.json({ 
      status: 'ok', 
      message: 'InventoryPro API is running!',
      endpoints: ['/api/health', '/api/products', '/api/sales', '/api/auth/login'],
      timestamp: new Date().toISOString()
    })
  }
}