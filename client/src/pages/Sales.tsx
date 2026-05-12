import { useState } from 'react'
import {
  ShoppingCart,
  Plus,
  FileText,
  Download,
  MoreVertical,
  CheckCircle,
  Clock,
  Truck,
  X,
} from 'lucide-react'
import { clsx } from 'clsx'

type OrderStatus = 'draft' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
type OrderType = 'quotation' | 'order' | 'invoice' | 'return'

interface SalesOrder {
  id: string
  number: string
  type: OrderType
  customer: string
  email: string
  date: string
  dueDate: string
  items: number
  total: number
  status: OrderStatus
  paymentStatus: 'pending' | 'partial' | 'paid'
}

const orders: SalesOrder[] = [
  { id: '1', number: 'INV-2024-001', type: 'invoice', customer: 'Tech Solutions Ltd', email: 'billing@techsol.com', date: '2024-01-15', dueDate: '2024-02-15', items: 5, total: 12450, status: 'delivered', paymentStatus: 'paid' },
  { id: '2', number: 'INV-2024-002', type: 'invoice', customer: 'Office Depot Inc', email: 'accounts@officedepot.com', date: '2024-01-14', dueDate: '2024-02-14', items: 3, total: 8320, status: 'shipped', paymentStatus: 'pending' },
  { id: '3', number: 'ORD-2024-045', type: 'order', customer: 'Digital Ventures', email: 'orders@digitalv.com', date: '2024-01-13', dueDate: '2024-01-20', items: 8, total: 21500, status: 'processing', paymentStatus: 'partial' },
  { id: '4', number: 'QUO-2024-089', type: 'quotation', customer: 'Creative Studios', email: 'procurement@creativest.com', date: '2024-01-12', dueDate: '2024-01-19', items: 4, total: 8900, status: 'confirmed', paymentStatus: 'pending' },
  { id: '5', number: 'INV-2024-003', type: 'invoice', customer: 'Global Enterprises', email: 'finance@globalent.com', date: '2024-01-11', dueDate: '2024-02-11', items: 6, total: 23500, status: 'delivered', paymentStatus: 'paid' },
]

export default function Sales() {
  const [viewTab, setViewTab] = useState<'all' | 'quotations' | 'orders' | 'invoices'>('all')
  const [showNewModal, setShowNewModal] = useState(false)

  const filteredOrders = viewTab === 'all' ? orders : orders.filter((o) => {
    if (viewTab === 'quotations') return o.type === 'quotation'
    if (viewTab === 'orders') return o.type === 'order'
    if (viewTab === 'invoices') return o.type === 'invoice'
    return true
  })

  const getStatusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      draft: 'bg-surface-100 text-surface-600',
      confirmed: 'bg-primary-50 text-primary-600',
      processing: 'bg-warning-50 text-warning-600',
      shipped: 'bg-accent-50 text-accent-600',
      delivered: 'bg-success-50 text-success-600',
      cancelled: 'bg-error-50 text-error-600',
    }
    return <span className={clsx('badge', styles[status])}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  const getPaymentBadge = (status: SalesOrder['paymentStatus']) => {
    const styles: Record<string, string> = {
      pending: 'badge-warning',
      partial: 'badge-primary',
      paid: 'badge-success',
    }
    return <span className={clsx('badge', styles[status])}>{status === 'partial' ? 'Partial' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Sales</h1>
          <p className="text-surface-500 mt-1">Manage quotes, orders, and invoices</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4" />
            New Sale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card cursor-pointer hover:shadow-elevated transition-shadow">
          <p className="stat-label">Total Revenue</p>
          <p className="stat-value">$44,270</p>
          <div className="stat-change up mt-2">
            <CheckCircle className="w-3 h-3" />
            All time
          </div>
        </div>
        <div className="stat-card cursor-pointer hover:shadow-elevated transition-shadow">
          <p className="stat-label">Pending Payments</p>
          <p className="stat-value text-warning-600">$30,400</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <Clock className="w-3 h-3" />
            Awaiting
          </div>
        </div>
        <div className="stat-card cursor-pointer hover:shadow-elevated transition-shadow">
          <p className="stat-label">Open Orders</p>
          <p className="stat-value">3</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <Truck className="w-3 h-3" />
            In progress
          </div>
        </div>
        <div className="stat-card cursor-pointer hover:shadow-elevated transition-shadow">
          <p className="stat-label">Quotes Sent</p>
          <p className="stat-value">1</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <FileText className="w-3 h-3" />
            Awaiting response
          </div>
        </div>
      </div>

      <div className="tabs">
        {(['all', 'quotations', 'orders', 'invoices'] as const).map((tab) => (
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
                <th>Customer</th>
                <th>Date</th>
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
                        order.type === 'quotation' ? 'bg-surface-100' :
                        order.type === 'order' ? 'bg-primary-50' : 'bg-accent-50'
                      )}>
                        <FileText className={clsx(
                          'w-5 h-5',
                          order.type === 'quotation' ? 'text-surface-500' :
                          order.type === 'order' ? 'text-primary-600' : 'text-accent-600'
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900">{order.number}</p>
                        <p className="text-xs text-surface-500 capitalize">{order.type}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-medium text-surface-900">{order.customer}</p>
                    <p className="text-xs text-surface-500">{order.email}</p>
                  </td>
                  <td>
                    <p className="text-surface-700">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-xs text-surface-500">Due: {new Date(order.dueDate).toLocaleDateString()}</p>
                  </td>
                  <td><span className="text-surface-600">{order.items} items</span></td>
                  <td>
                    <p className="font-mono font-semibold text-surface-900">${order.total.toLocaleString()}</p>
                  </td>
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
                  <ShoppingCart className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">New Sale</h2>
                  <p className="text-sm text-surface-500">Create a new invoice, order, or quotation</p>
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
                  {(['invoice', 'order', 'quotation'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-3 p-4 border-2 border-surface-200 rounded-xl cursor-pointer hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50">
                      <input type="radio" name="docType" value={type} defaultChecked={type === 'invoice'} className="text-primary-600" />
                      <div>
                        <p className="font-medium capitalize">{type}</p>
                        <p className="text-xs text-surface-500">
                          {type === 'invoice' ? 'Request payment' : type === 'order' ? 'Track fulfillment' : 'Send for approval'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="input-label">Customer *</label>
                <select className="input">
                  <option value="">Select customer</option>
                  <option value="tech">Tech Solutions Ltd</option>
                  <option value="office">Office Depot Inc</option>
                  <option value="digital">Digital Ventures</option>
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
                        <th className="px-4 py-3 text-right font-medium text-surface-600 w-32">Price</th>
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
                  <textarea className="input" rows={3} placeholder="Add any notes or terms..." />
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
                <CheckCircle className="w-4 h-4" /> Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}