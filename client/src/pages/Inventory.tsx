import { useState } from 'react'
import {
  Package,
  Plus,
  Search,
  Grid3X3,
  List,
  Download,
  ScanLine,
  MoreVertical,
  X,
  AlertTriangle,
  CheckCircle,
  PackagePlus,
} from 'lucide-react'
import { clsx } from 'clsx'

type ViewMode = 'grid' | 'list'
type ProductCategory = 'all' | 'electronics' | 'furniture' | 'clothing' | 'accessories'

interface Product {
  id: string
  sku: string
  name: string
  category: string
  barcode: string
  quantity: number
  reorderLevel: number
  costPrice: number
  sellingPrice: number
  warehouse: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

const initialProducts: Product[] = [
  { id: '1', sku: 'LAP-001', name: 'MacBook Pro M3 14"', category: 'electronics', barcode: '1234567890123', quantity: 45, reorderLevel: 10, costPrice: 1500, sellingPrice: 1999, warehouse: 'Main Warehouse', status: 'in_stock' },
  { id: '2', sku: 'PHN-002', name: 'iPhone 15 Pro 256GB', category: 'electronics', barcode: '1234567890124', quantity: 8, reorderLevel: 15, costPrice: 700, sellingPrice: 999, warehouse: 'Main Warehouse', status: 'low_stock' },
  { id: '3', sku: 'TV-003', name: 'Samsung 65" 4K Smart TV', category: 'electronics', barcode: '1234567890125', quantity: 28, reorderLevel: 5, costPrice: 800, sellingPrice: 1099, warehouse: 'Main Warehouse', status: 'in_stock' },
  { id: '4', sku: 'AUD-004', name: 'AirPods Pro 2nd Gen', category: 'electronics', barcode: '1234567890126', quantity: 200, reorderLevel: 50, costPrice: 180, sellingPrice: 249, warehouse: 'Main Warehouse', status: 'in_stock' },
  { id: '5', sku: 'FURN-005', name: 'Executive Office Chair', category: 'furniture', barcode: '1234567890127', quantity: 0, reorderLevel: 5, costPrice: 250, sellingPrice: 449, warehouse: 'Secondary Warehouse', status: 'out_of_stock' },
  { id: '6', sku: 'FURN-006', name: 'Standing Desk Electric', category: 'furniture', barcode: '1234567890128', quantity: 15, reorderLevel: 3, costPrice: 400, sellingPrice: 699, warehouse: 'Main Warehouse', status: 'in_stock' },
]

const categories = [
  { id: 'all', name: 'All Products', count: 156 },
  { id: 'electronics', name: 'Electronics', count: 78 },
  { id: 'furniture', name: 'Furniture', count: 34 },
  { id: 'clothing', name: 'Clothing', count: 28 },
  { id: 'accessories', name: 'Accessories', count: 16 },
]

export default function Inventory() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredProducts = initialProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in_stock':
        return <span className="badge badge-success"><CheckCircle className="w-3 h-3 mr-1" /> In Stock</span>
      case 'low_stock':
        return <span className="badge badge-warning"><AlertTriangle className="w-3 h-3 mr-1" /> Low Stock</span>
      case 'out_of_stock':
        return <span className="badge badge-error"><X className="w-3 h-3 mr-1" /> Out of Stock</span>
    }
  }

  const totalValue = initialProducts.reduce((acc, p) => acc + (p.quantity * p.costPrice), 0)
  const lowStockCount = initialProducts.filter((p) => p.status === 'low_stock' || p.status === 'out_of_stock').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Inventory</h1>
          <p className="text-surface-500 mt-1">Manage your products and stock levels</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Products</p>
          <p className="stat-value">{initialProducts.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Value</p>
          <p className="stat-value">${totalValue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Low Stock Items</p>
          <p className="stat-value text-warning-600">{lowStockCount}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Out of Stock</p>
          <p className="stat-value text-error-600">{initialProducts.filter((p) => p.status === 'out_of_stock').length}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, or barcode..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors',
                  selectedCategory === cat.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
                )}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
          <div className="flex gap-1 p-1 bg-surface-100 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={clsx('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-surface-200')}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={clsx('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-surface-200')}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-12"><input type="checkbox" className="rounded border-surface-300" /></th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Cost Price</th>
                  <th>Selling Price</th>
                  <th>Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="group">
                    <td><input type="checkbox" className="rounded border-surface-300" /></td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-surface-400" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900">{product.name}</p>
                          <p className="text-xs text-surface-500 font-mono">{product.barcode}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="font-mono text-sm text-surface-600">{product.sku}</span></td>
                    <td><span className="capitalize text-surface-600">{product.category}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-surface-100 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full',
                              product.status === 'in_stock' ? 'bg-success-500' :
                              product.status === 'low_stock' ? 'bg-warning-500' : 'bg-error-500'
                            )}
                            style={{ width: `${Math.min((product.quantity / (product.reorderLevel * 3)) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{product.quantity}</span>
                      </div>
                    </td>
                    <td className="font-mono">${product.costPrice.toLocaleString()}</td>
                    <td className="font-mono font-medium">${product.sellingPrice.toLocaleString()}</td>
                    <td>{getStatusBadge(product.status)}</td>
                    <td>
                      <div className="relative">
                        <button className="p-2 rounded-lg hover:bg-surface-100 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="p-4">
                <div className="aspect-video bg-surface-50 rounded-xl mb-4 flex items-center justify-center">
                  <Package className="w-12 h-12 text-surface-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-surface-900">{product.name}</h3>
                      <p className="text-xs text-surface-500">{product.sku}</p>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className={clsx(
                            'h-full rounded-full',
                            product.status === 'in_stock' ? 'bg-success-500' :
                            product.status === 'low_stock' ? 'bg-warning-500' : 'bg-error-500'
                          )}
                          style={{ width: `${Math.min((product.quantity / (product.reorderLevel * 3)) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-surface-500 mt-1">{product.quantity} units</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-100">
                    <div>
                      <p className="text-xs text-surface-500">Cost</p>
                      <p className="font-mono font-medium">${product.costPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-surface-500">Price</p>
                      <p className="font-mono font-medium text-primary-600">${product.sellingPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-surface-100 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="btn btn-sm btn-secondary flex-1">
                  <ScanLine className="w-3 h-3" /> Adjust
                </button>
                <button className="btn btn-sm btn-ghost flex-1">
                  <ScanLine className="w-3 h-3" /> Scan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="text-lg font-semibold">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="input-label">Product Name *</label>
                  <input type="text" className="input" placeholder="Enter product name" />
                </div>
                <div>
                  <label className="input-label">SKU *</label>
                  <input type="text" className="input" placeholder="e.g., LAP-001" />
                </div>
                <div>
                  <label className="input-label">Barcode</label>
                  <div className="flex gap-2">
                    <input type="text" className="input flex-1" placeholder="Scan or enter barcode" />
                    <button className="btn btn-secondary px-3">
                      <ScanLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="input-label">Category *</label>
                  <select className="input">
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Warehouse *</label>
                  <select className="input">
                    <option value="">Select warehouse</option>
                    <option value="main">Main Warehouse</option>
                    <option value="secondary">Secondary Warehouse</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Cost Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">$</span>
                    <input type="number" className="input pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Selling Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">$</span>
                    <input type="number" className="input pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="input-label">Initial Stock</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div>
                  <label className="input-label">Reorder Level</label>
                  <input type="number" className="input" placeholder="10" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary">
                <PackagePlus className="w-4 h-4" /> Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}