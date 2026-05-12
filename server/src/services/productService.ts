import { query } from '../config/database'

export const productService = {
  async getAll(filters?: { category?: string; search?: string; warehouse?: string }) {
    let sql = `
      SELECT p.*, c.name as category_name, 
             COALESCE((SELECT SUM(quantity) FROM stock_movements WHERE product_id = p.id), 0) as stock_quantity
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `
    const params: any[] = []

    if (filters?.category) {
      params.push(filters.category)
      sql += ` AND p.category_id = $${params.length}`
    }
    if (filters?.search) {
      params.push(`%${filters.search}%`)
      sql += ` AND (p.name ILIKE $${params.length} OR p.sku ILIKE $${params.length} OR p.barcode ILIKE $${params.length})`
    }

    sql += ' ORDER BY p.name'
    return (await query(sql, params)).rows
  },

  async getById(id: number) {
    const result = await query(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `, [id])
    return result.rows[0]
  },

  async create(data: {
    sku: string
    name: string
    barcode?: string
    description?: string
    category_id?: number
    cost_price: number
    selling_price: number
    reorder_level?: number
    unit?: string
  }) {
    const result = await query(`
      INSERT INTO products (sku, name, barcode, description, category_id, cost_price, selling_price, reorder_level, unit)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [data.sku, data.name, data.barcode, data.description, data.category_id, data.cost_price, data.selling_price, data.reorder_level || 10, data.unit || 'pcs'])
    return result.rows[0]
  },

  async update(id: number, data: Partial<{
    name: string
    barcode: string
    description: string
    category_id: number
    cost_price: number
    selling_price: number
    reorder_level: number
    unit: string
  }>) {
    const fields = Object.keys(data).filter(k => data[k as keyof typeof data] !== undefined)
    if (fields.length === 0) return null

    const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ')
    const values = fields.map(f => data[f as keyof typeof data])

    const result = await query(`
      UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id, ...values])
    return result.rows[0]
  },

  async delete(id: number) {
    await query('UPDATE products SET is_active = false WHERE id = $1', [id])
    return { message: 'Product deleted' }
  },

  async getStock(productId: number) {
    const result = await query(`
      SELECT 
        COALESCE(SUM(CASE WHEN movement_type IN ('purchase', 'return', 'adjustment_in') THEN quantity ELSE 0 END), 0) as total_in,
        COALESCE(SUM(CASE WHEN movement_type IN ('sale', 'purchase_return', 'adjustment_out') THEN quantity ELSE 0 END), 0) as total_out,
        COALESCE(SUM(CASE WHEN movement_type IN ('purchase', 'return', 'adjustment_in') THEN quantity ELSE -quantity END), 0) as current_stock
      FROM stock_movements
      WHERE product_id = $1
    `, [productId])
    return result.rows[0]
  }
}