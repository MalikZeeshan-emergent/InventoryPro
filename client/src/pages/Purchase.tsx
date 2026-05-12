import { useState } from 'react'
import {
  Truck,
  Plus,
  FileText,
  Download,
  MoreVertical,
  CheckCircle,
  Clock,
  Building2,
  X,
  ArrowDownRight,
} from 'lucide-react'
import { clsx } from 'clsx'

type OrderStatus = 'draft' | 'ordered' | 'received' | 'partial' | 'cancelled'
type OrderType = 'purchase_order' | 'goods_receipt' | 'purchase_bill' | 'return'

interface PurchaseOrder {
  id: string
  number: string
  type: OrderType
  supplier: string
  email: string
  date: string
  expectedDate: string
  items: number
  total: number
  status: OrderStatus
  paymentStatus: 'pending' | 'partial' | 'paid'
}

const orders: PurchaseOrder[] = [
  { id: '1', number: 'PO-2024-045', type: 'purchase_order', supplier: 'Global Supplies Co', email: 'orders@globalsupplies.com', date: '2024-01-15', expectedDate: '2024-01-22', items: 8, total: 15000, status: 'received', paymentStatus: 'paid' },
  { id: '2', number: 'PO-2024-046', type: 'purchase_order', supplier: 'Tech Distributors Inc', email: 'procurement@techdist.com', date: '2024-01-14', expectedDate: '2024-01-21', items: 5, total: 9265, status: 'ordered', paymentStatus: 'pending' },
  { id: '3', number: 'GR-2024-012', type: 'goods_receipt', supplier: 'Office Essentials Ltd', email: 'shipping@officeess.com', date: '2024-01-13', expectedDate: '2024-01-13', items: 12, total: 4578, status: 'received', paymentStatus: 'partial' },
  { id: '4', number: 'PB-2024-023', type: 'purchase_bill', supplier: 'Premium Goods Ltd', email: 'accounts@premiumgoods.com', date: '2024-01-12', expectedDate: '2024-01-27', items: 6, total: 12535, status: 'draft', paymentStatus: 'pending' },
  { id: '5', number: 'PO-2024-047', type: 'purchase_order', supplier: 'Wholesale Partners', email: 'sales@wholesalepartners.com', date: '2024-01-11', expectedDate: '2024-01-18', items: 15, total: 23980, status: 'ordered', paymentStatus: 'pending' },
]

export default function Purchase() {
  const [viewTab, setViewTab] = useState<'all' | 'orders' | 'receipts' | 'bills'>('all')
  const [showNewModal, setShowNewModal] = useState(false)

  const filteredOrders = viewTab === 'all' ? orders : orders.filter((o) => {
    if (viewTab === 'orders') return o.type === 'purchase_order'
    if (viewTab === 'receipts') return o.type === 'goods_receipt'
    if (viewTab === 'bills') return o.type === 'purchase_bill'
    return true
  })

  const getStatusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      draft: 'bg-surface-100 text-surface-600',
      ordered: 'bg-primary-50 text-primary-600',
      received: 'bg-success-50 text-success-600',
      partial: 'bg-warning-50 text-warning-600',
      cancelled: 'bg-error-50 text-error-600',
    }
    return <span className={clsx('badge', styles[status])}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const getPaymentBadge = (status: PurchaseOrder['paymentStatus']) => {
    const styles: Record<string, string> = {
      pending: 'badge-warning',
      partial: 'badge-primary',
      paid: 'badge-success',
    }
    return <span className={clsx('badge', styles[status])}>{status === 'partial' ? 'Partial' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const getTypeLabel = (type: OrderType) => {
    const labels: Record<OrderType, string> = {
      purchase_order: 'Purchase Order',
      goods_receipt: 'Goods Receipt',
      purchase_bill: 'Purchase Bill',
      return: 'Return',
    }
    return <span className="text-xs text-surface-500">{labels[type]}</span>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Purchase</h1>
          <p className="text-surface-500 mt-1">Manage purchase orders and supplier payments</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4" />
            New Purchase
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Purchases</p>
          <p className="stat-value">$50,358</p>
          <div className="stat-change up mt-2">
            <ArrowDownRight className="w-3 h-3" />
            All time
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pending Payments</p>
          <p className="stat-value text-warning-600">$45,780</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <Clock className="w-3 h-3" />
            Due soon
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Orders Received</p>
          <p className="stat-value">2</p>
          <div className="stat-change up mt-2">
            <CheckCircle className="w-3 h-3" />
            This month
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Active Suppliers</p>
          <p className="stat-value">4</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <Building2 className="w-3 h-3" />
            Registered
          </div>
        </div>
      </div>

      <div className="tabs">
        {(['all', 'orders', 'receipts', 'bills'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setViewTab(tab)}
            className={clsx('tab', viewTab === tab && 'active')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Expected</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group cursor-pointer" onClick={() => setShowNewModal(true)}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        order.type === 'purchase_order' ? 'bg-primary-50' :
                        order.type === 'goods_receipt' ? 'bg-success-50' : 'bg-accent-50'
                      )}>
                        <FileText className={clsx(
                          'w-5 h-5',
                          order.type === 'purchase_order' ? 'text-primary-600' :
                          order.type === 'goods_receipt' ? 'text-success-600' : 'text-accent-600'
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900">{order.number}</p>
                        {getTypeLabel(order.type)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-medium text-surface-900">{order.supplier}</p>
                    <p className="text-xs text-surface-500">{order.email}</p>
                  </td>
                  <td><p className="text-surface-700">{new Date(order.date).toLocaleDateString()}</p></td>
                  <td><p className="text-surface-700">{new Date(order.expectedDate).toLocaleDateString()}</p></td>
                  <td><span className="text-surface-600">{order.items} items</span></td>
                  <td><p className="font-mono font-semibold text-surface-900">${order.total.toLocaleString()}</p></td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{getPaymentBadge(order.paymentStatus)}</td>
                  <td>
                    <button className="p-2 rounded-lg hover:bg-surface-100 opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">New Purchase</h2>
                  <p className="text-sm text-surface-500">Create a purchase order or record receipt</p>
                </div>
              </div>
              <button onClick={() => setShowNewModal(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-6">
                <label className="input-label">Document Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['purchase_order', 'goods_receipt', 'purchase_bill'] as const).map((type) => {
                    const labels: Record<string, string> = {
                      purchase_order: 'Purchase Order',
                      goods_receipt: 'Goods Receipt',
                      purchase_bill: 'Purchase Bill',
                    }
                    return (
                      <label key={type} className="flex items-center gap-3 p-4 border-2 border-surface-200 rounded-xl cursor-pointer hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                        <input type="radio" name="docType" value={type} defaultChecked={type === 'purchase_order'} className="text-primary-600" />
                        <div>
                          <p className="font-medium">{labels[type]}</p>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>
              <div className="mb-6">
                <label className="input-label">Supplier *</label>
                <select className="input">
                  <option value="">Select supplier</option>
                  <option value="global">Global Supplies Co</option>
                  <option value="tech">Tech Distributors Inc</option>
                  <option value="office">Office Essentials Ltd</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="input-label">Line Items</label>
                <div className="border border-surface-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-surface-600">Product</th>
                        <th className="px-4 py-3 text-center font-medium text-surface-600 w-24">Qty</th>
                        <th className="px-4 py-3 text-right font-medium text-surface-600 w-32">Unit Cost</th>
                        <th className="px-4 py-3 text-right font-medium text-surface-600 w-32">Total</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3">
                          <input type="text" className="input border-0 p-0 bg-transparent focus:ring-0" placeholder="Search or enter product..." />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" className="input border-0 p-0 bg-transparent text-center focus:ring-0" defaultValue="1" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" className="input border-0 p-0 bg-transparent text-right font-mono focus:ring-0" placeholder="$0.00" />
                        </td>
                        <td className="px-4 py-3 text-right font-mono">$0.00</td>
                        <td className="px-4 py-3">
                          <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-error-500">
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-4 py-3 bg-surface-50 border-t border-surface-200">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add Line Item
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="input-label">Notes</label>
                  <textarea className="input" rows={3} placeholder="Add any notes..." />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Subtotal</span>
                    <span className="font-mono">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-500">Tax (10%)</span>
                    <span className="font-mono">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-surface-200">
                    <span className="font-semibold text-surface-900">Total</span>
                    <span className="text-xl font-bold font-mono text-surface-900">$0.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNewModal(false)}>Save as Draft</button>
              <button className="btn btn-primary">
                <CheckCircle className="w-4 h-4" /> Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}