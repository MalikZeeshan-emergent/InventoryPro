import { query } from '../config/database'

export const salesService = {
  async getAll(filters?: { status?: string; customer_id?: number; date_from?: string; date_to?: string }) {
    let sql = `
      SELECT so.*, c.name as customer_name, u.name as created_by_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      LEFT JOIN users u ON so.created_by = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (filters?.status) {
      params.push(filters.status)
      sql += ` AND so.status = $${params.length}`
    }
    if (filters?.customer_id) {
      params.push(filters.customer_id)
      sql += ` AND so.customer_id = $${params.length}`
    }
    if (filters?.date_from) {
      params.push(filters.date_from)
      sql += ` AND so.order_date >= $${params.length}`
    }
    if (filters?.date_to) {
      params.push(filters.date_to)
      sql += ` AND so.order_date <= $${params.length}`
    }

    sql += ' ORDER BY so.created_at DESC'
    return (await query(sql, params)).rows
  },

  async getById(id: number) {
    const order = (await query(`
      SELECT so.*, c.name as customer_name, c.email as customer_email, u.name as created_by_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      LEFT JOIN users u ON so.created_by = u.id
      WHERE so.id = $1
    `, [id])).rows[0]

    if (order) {
      order.items = (await query(`
        SELECT soi.*, p.name as product_name, p.sku, p.barcode
        FROM sales_order_items soi
        LEFT JOIN products p ON soi.product_id = p.id
        WHERE soi.order_id = $1
      `, [id])).rows
    }
    return order
  },

  async create(data: {
    customer_id: number
    order_type: string
    order_date?: string
    due_date?: string
    notes?: string
    items: Array<{
      product_id: number
      batch_id?: number
      quantity: number
      unit_price: number
      tax_rate?: number
      discount_rate?: number
    }>
    created_by: number
  }) {
    const client = await (await import('../config/database')).pool.connect()
    try {
      await client.query('BEGIN')

      const orderNumber = `INV-${Date.now()}`
      const orderResult = await client.query(`
        INSERT INTO sales_orders (order_number, customer_id, order_type, order_date, due_date, notes, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [orderNumber, data.customer_id, data.order_type, data.order_date || new Date(), data.due_date, data.notes, data.created_by])

      const order = orderResult.rows[0]
      let subtotal = 0

      for (const item of data.items) {
        const total = item.quantity * item.unit_price * (1 + (item.tax_rate || 0) / 100) * (1 - (item.discount_rate || 0) / 100)
        subtotal += total

        await client.query(`
          INSERT INTO sales_order_items (order_id, product_id, batch_id, quantity, unit_price, tax_rate, discount_rate, total)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [order.id, item.product_id, item.batch_id, item.quantity, item.unit_price, item.tax_rate || 0, item.discount_rate || 0, total])

        await client.query(`
          INSERT INTO stock_movements (product_id, batch_id, movement_type, quantity, reference_type, reference_id, user_id)
          VALUES ($1, $2, 'sale', $3, 'sales_order', $4, $5)
        `, [item.product_id, item.batch_id, -item.quantity, order.id, data.created_by])
      }

      const taxAmount = subtotal * 0.1
      await client.query(`
        UPDATE sales_orders SET subtotal = $1, tax_amount = $2, total_amount = $3
        WHERE id = $4
      `, [subtotal, taxAmount, subtotal + taxAmount, order.id])

      await client.query('COMMIT')
      return this.getById(order.id)
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  },

  async updateStatus(id: number, status: string) {
    const result = await query(`
      UPDATE sales_orders SET status = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id, status])
    return result.rows[0]
  }
}