import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/inventorypro',
})

export const query = async (text: string, params?: any[]) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount })
  return res
}

export const initDatabase = async () => {
  const client = await pool.connect()
  try {
    await client.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Roles table
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        permissions JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Branches table
      CREATE TABLE IF NOT EXISTS branches (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Warehouses table
      CREATE TABLE IF NOT EXISTS warehouses (
        id SERIAL PRIMARY KEY,
        branch_id INTEGER REFERENCES branches(id),
        name VARCHAR(255) NOT NULL,
        location TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        parent_id INTEGER REFERENCES categories(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Products table
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE NOT NULL,
        barcode VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INTEGER REFERENCES categories(id),
        cost_price DECIMAL(15,2) DEFAULT 0,
        selling_price DECIMAL(15,2) DEFAULT 0,
        reorder_level INTEGER DEFAULT 10,
        unit VARCHAR(50) DEFAULT 'pcs',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Batch/Lot tracking
      CREATE TABLE IF NOT EXISTS batches (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        batch_number VARCHAR(100),
        expiry_date DATE,
        manufacturing_date DATE,
        cost_price DECIMAL(15,2),
        quantity INTEGER DEFAULT 0,
        warehouse_id INTEGER REFERENCES warehouses(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Stock movements
      CREATE TABLE IF NOT EXISTS stock_movements (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        batch_id INTEGER REFERENCES batches(id),
        warehouse_id INTEGER REFERENCES warehouses(id),
        movement_type VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL,
        reference_type VARCHAR(50),
        reference_id INTEGER,
        notes TEXT,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Customers table
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        credit_limit DECIMAL(15,2) DEFAULT 0,
        payment_terms INTEGER DEFAULT 30,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Suppliers table
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        contact_person VARCHAR(255),
        payment_terms INTEGER DEFAULT 30,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Sales orders
      CREATE TABLE IF NOT EXISTS sales_orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_id INTEGER REFERENCES customers(id),
        order_type VARCHAR(50) DEFAULT 'invoice',
        status VARCHAR(50) DEFAULT 'draft',
        order_date DATE DEFAULT CURRENT_DATE,
        due_date DATE,
        subtotal DECIMAL(15,2) DEFAULT 0,
        tax_amount DECIMAL(15,2) DEFAULT 0,
        discount_amount DECIMAL(15,2) DEFAULT 0,
        total_amount DECIMAL(15,2) DEFAULT 0,
        notes TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Sales order items
      CREATE TABLE IF NOT EXISTS sales_order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES sales_orders(id),
        product_id INTEGER REFERENCES products(id),
        batch_id INTEGER REFERENCES batches(id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(15,2) NOT NULL,
        tax_rate DECIMAL(5,2) DEFAULT 0,
        discount_rate DECIMAL(5,2) DEFAULT 0,
        total DECIMAL(15,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Purchase orders
      CREATE TABLE IF NOT EXISTS purchase_orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        supplier_id INTEGER REFERENCES suppliers(id),
        order_type VARCHAR(50) DEFAULT 'purchase_order',
        status VARCHAR(50) DEFAULT 'draft',
        order_date DATE DEFAULT CURRENT_DATE,
        expected_date DATE,
        subtotal DECIMAL(15,2) DEFAULT 0,
        tax_amount DECIMAL(15,2) DEFAULT 0,
        shipping_cost DECIMAL(15,2) DEFAULT 0,
        total_amount DECIMAL(15,2) DEFAULT 0,
        notes TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Purchase order items
      CREATE TABLE IF NOT EXISTS purchase_order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES purchase_orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        unit_cost DECIMAL(15,2) NOT NULL,
        tax_rate DECIMAL(5,2) DEFAULT 0,
        total DECIMAL(15,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Accounts (Chart of Accounts)
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        parent_id INTEGER REFERENCES accounts(id),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Journal entries
      CREATE TABLE IF NOT EXISTS journal_entries (
        id SERIAL PRIMARY KEY,
        entry_number VARCHAR(50) UNIQUE NOT NULL,
        date DATE DEFAULT CURRENT_DATE,
        description TEXT,
        reference_type VARCHAR(50),
        reference_id INTEGER,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Journal entry lines
      CREATE TABLE IF NOT EXISTS journal_entry_lines (
        id SERIAL PRIMARY KEY,
        entry_id INTEGER REFERENCES journal_entries(id),
        account_id INTEGER REFERENCES accounts(id),
        debit DECIMAL(15,2) DEFAULT 0,
        credit DECIMAL(15,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Payments
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        payment_number VARCHAR(50) UNIQUE NOT NULL,
        payment_type VARCHAR(50) NOT NULL,
        party_type VARCHAR(20) NOT NULL,
        party_id INTEGER NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        payment_date DATE DEFAULT CURRENT_DATE,
        payment_method VARCHAR(50),
        reference VARCHAR(255),
        notes TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Audit logs
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id INTEGER,
        old_values JSONB,
        new_values JSONB,
        ip_address VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Insert default admin user (password: admin123)
      INSERT INTO users (email, password, name, role)
      VALUES ('admin@inventorypro.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'super_admin')
      ON CONFLICT (email) DO NOTHING;

      -- Insert default roles
      INSERT INTO roles (name, permissions) VALUES
      ('super_admin', '["*"]'),
      ('admin', '["dashboard", "inventory.*", "sales.*", "purchase.*", "accounts.*", "reports.*"]'),
      ('manager', '["dashboard", "inventory.read", "sales.*", "purchase.read", "accounts.read", "reports.read"]'),
      ('accountant', '["dashboard", "inventory.read", "sales.read", "purchase.read", "accounts.*", "reports.read"]'),
      ('sales_rep', '["dashboard", "sales.*", "customers.read"]'),
      ('warehouse_staff', '["dashboard", "inventory.*"]')
      ON CONFLICT (name) DO NOTHING;

      -- Insert default chart of accounts
      INSERT INTO accounts (code, name, type) VALUES
      ('1001', 'Cash', 'asset'),
      ('1002', 'Bank Account', 'asset'),
      ('1003', 'Accounts Receivable', 'asset'),
      ('1004', 'Inventory', 'asset'),
      ('2001', 'Accounts Payable', 'liability'),
      ('2002', 'Tax Payable', 'liability'),
      ('3001', 'Owner Capital', 'equity'),
      ('4001', 'Sales Revenue', 'revenue'),
      ('5001', 'Cost of Goods Sold', 'expense'),
      ('5002', 'Operating Expenses', 'expense')
      ON CONFLICT (code) DO NOTHING;

      -- Insert default branch
      INSERT INTO branches (name, address, phone, email)
      VALUES ('Main Branch', '123 Business Street, New York, NY 10001', '+1 (555) 123-4567', 'info@inventorypro.com')
      ON CONFLICT DO NOTHING;

      -- Insert default warehouse
      INSERT INTO warehouses (name, location)
      VALUES ('Main Warehouse', 'Building A, Floor 1')
      ON CONFLICT DO NOTHING;
    `)
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
  } finally {
    client.release()
  }
}