# InventoryPro - Enterprise Inventory Management System

A premium, all-in-one inventory management system for businesses that need complete control over sales, purchases, inventory, and accounting. Designed for 11-50 users with role-based access and real-time auto-linking between modules.

## Features

### Core Modules
- **Dashboard** - Real-time KPIs, revenue charts, stock alerts, recent transactions
- **Inventory** - Products, batches, warehouses, barcode/QR scanning, stock adjustments
- **Sales** - Quotations, orders, invoices, delivery challans, returns management
- **Purchase** - Purchase orders, goods receipts, bills, supplier management
- **Accounts** - Double-entry bookkeeping, journal entries, chart of accounts, P&L, Balance Sheet
- **Reports** - Sales analytics, inventory valuation, financial reports, export to PDF/Excel

### Key Features
- **Auto-Linking**: Every transaction automatically updates inventory, accounts, and ledgers
- **Role-Based Access**: 6 user roles with granular permissions (Super Admin, Admin, Manager, Accountant, Sales Rep, Warehouse Staff)
- **Barcode/QR Support**: Generate and scan product barcodes
- **Multi-Warehouse**: Track stock across multiple locations
- **Batch/Lot Tracking**: Track manufacturing dates and expiry
- **Audit Trail**: Complete log of all user actions
- **Export Capabilities**: PDF, Excel, CSV exports for all reports

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
inventory-pro/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx    # Main layout with sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Inventory.tsx
│   │   │   ├── Sales.tsx
│   │   │   ├── Purchase.tsx
│   │   │   ├── Accounts.tsx
│   │   │   ├── Reports.tsx
│   │   │   └── Settings.tsx
│   │   ├── App.tsx          # Router configuration
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Tailwind design system
│   ├── dist/                # Production build
│   ├── package.json
│   └── vite.config.ts
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts  # PostgreSQL schema & connection
│   │   ├── controllers/      # (future expansion)
│   │   ├── middleware/
│   │   │   ├── auth.ts      # JWT authentication
│   │   │   └── error.ts     # Error handling
│   │   ├── routes/
│   │   │   ├── auth.ts      # /api/auth
│   │   │   ├── products.ts  # /api/products
│   │   │   └── sales.ts     # /api/sales
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   └── salesService.ts
│   │   └── index.ts         # Express app entry
│   ├── dist/                # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
├── SPEC.md                   # Full system specification
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Quick Start

1. **Clone/Download the project**

2. **Install dependencies**
```bash
# Root package (optional)
npm install

# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

3. **Configure Database**
```bash
# Create PostgreSQL database
createdb inventorypro

# Copy and edit environment file
cd server
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run Migrations**
```bash
cd server
npm run migrate
```

5. **Start Development Servers**
```bash
# From root directory
npm run dev

# Or separately:
cd client && npm run dev   # Frontend: http://localhost:5173
cd server && npm run dev   # Backend: http://localhost:3001
```

6. **Access the App**
Open http://localhost:5173 in your browser.

## Production Build

```bash
# Build frontend
cd client && npm run build

# Build backend
cd server && npm run build

# Deploy:
# - client/dist/ -> Static hosting (Vercel, Netlify, Apache, Nginx)
# - server/dist/ -> Node.js hosting (Railway, Render, AWS, DigitalOcean)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/password` - Update password

### Products
- `GET /api/products` - List all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Soft delete product
- `GET /api/products/:id/stock` - Get stock levels

### Sales
- `GET /api/sales` - List all sales orders
- `GET /api/sales/:id` - Get order details
- `POST /api/sales` - Create new order
- `PATCH /api/sales/:id/status` - Update order status

### Health Check
- `GET /api/health` - Server health status

## Database Schema

The system includes tables for:
- `users` - User accounts with roles
- `roles` - Role definitions and permissions
- `branches` - Multi-branch support
- `warehouses` - Warehouse management
- `categories` - Product categories
- `products` - Product catalog
- `batches` - Batch/lot tracking
- `stock_movements` - Complete inventory history
- `customers` - Customer database
- `suppliers` - Supplier database
- `sales_orders` - Sales orders with items
- `purchase_orders` - Purchase orders with items
- `accounts` - Chart of accounts
- `journal_entries` - Double-entry journal
- `payments` - Payment tracking
- `audit_logs` - System audit trail

## Default Login

After running migrations, access with:
- **Email**: admin@inventorypro.com
- **Password**: admin123

*Note: Change the default password after first login!*

## Configuration

### Environment Variables (server/.env)
```
PORT=3001
DATABASE_URL=postgres://postgres:postgres@localhost:5432/inventorypro
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### User Roles
| Role | Access Level |
|------|-------------|
| Super Admin | Full system access, user management |
| Admin | All modules except system settings |
| Manager | View all, create/edit own branch data |
| Accountant | Full accounts, limited inventory |
| Sales Rep | Sales module, customer management |
| Warehouse Staff | Inventory receive/ship, stock adjustments |

## Auto-Linking Workflow

| Transaction | Inventory | Accounts | Sales | Purchase |
|-------------|-----------|----------|-------|----------|
| Buy Stock | + Stock | + Payable | - | + PO |
| Sell Product | - Stock | + Receivable | + Invoice | - |
| Return Purchase | - Stock | - Payable | - | + Return |
| Return Sale | + Stock | - Receivable | + Credit | - |

## Export Formats

All reports support:
- PDF (via browser print)
- Excel (CSV download)
- Print directly from browser

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Audit trail for all actions
- Input validation with express-validator
- CORS configuration

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile browsers (responsive design)

## License

Proprietary - All rights reserved

## Support

For customization or enterprise features, contact the development team.