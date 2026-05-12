import { useState } from 'react'
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Calendar,
  Filter,
  Printer,
  Share2,
} from 'lucide-react'
import { clsx } from 'clsx'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const salesData = [
  { date: 'Jan 1', sales: 4200, orders: 12 },
  { date: 'Jan 5', sales: 5800, orders: 18 },
  { date: 'Jan 10', sales: 4900, orders: 15 },
  { date: 'Jan 15', sales: 6200, orders: 22 },
  { date: 'Jan 20', sales: 7100, orders: 25 },
  { date: 'Jan 25', sales: 5500, orders: 19 },
  { date: 'Jan 30', sales: 8900, orders: 31 },
]

const productPerformance = [
  { name: 'MacBook Pro', sales: 45, revenue: 89955, growth: 12 },
  { name: 'iPhone 15', sales: 78, revenue: 77922, growth: 8 },
  { name: 'AirPods', sales: 120, revenue: 29880, growth: 15 },
  { name: 'iPad Pro', sales: 35, revenue: 41965, growth: -3 },
  { name: 'Watch Ultra', sales: 28, revenue: 25172, growth: 22 },
]

const reports = [
  { id: 'sales', title: 'Sales Report', desc: 'Sales by date, customer, product', icon: ShoppingCart, type: 'financial' },
  { id: 'purchase', title: 'Purchase Report', desc: 'Purchases by supplier, product', icon: Package, type: 'financial' },
  { id: 'inventory', title: 'Inventory Report', desc: 'Stock levels, valuation, movements', icon: Package, type: 'inventory' },
  { id: 'profit', title: 'Profit & Loss', desc: 'Income statement, expense breakdown', icon: TrendingUp, type: 'financial' },
  { id: 'customer', title: 'Customer Analysis', desc: 'Top customers, payment history', icon: DollarSign, type: 'analysis' },
  { id: 'supplier', title: 'Supplier Analysis', desc: 'Supplier performance, trends', icon: DollarSign, type: 'analysis' },
]

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('sales')
  const [dateRange, setDateRange] = useState('last30')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Reports</h1>
          <p className="text-surface-500 mt-1">Analytics and insights for your business</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="btn btn-secondary">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="btn btn-primary">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={clsx(
              'card p-4 text-left hover:shadow-elevated transition-all',
              selectedReport === report.id && 'ring-2 ring-primary-500 bg-primary-50'
            )}
          >
            <div className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
              selectedReport === report.id ? 'bg-primary-100' : 'bg-surface-100'
            )}>
              <report.icon className={clsx(
                'w-5 h-5',
                selectedReport === report.id ? 'text-primary-600' : 'text-surface-500'
              )} />
            </div>
            <h3 className="font-medium text-surface-900 text-sm">{report.title}</h3>
            <p className="text-xs text-surface-500 mt-1">{report.desc}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-surface-400" />
            <select
              className="input py-2 w-40"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="thisMonth">This month</option>
              <option value="lastMonth">Last month</option>
              <option value="thisYear">This year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-400" />
            <select className="input py-2 w-40">
              <option value="">All Branches</option>
              <option value="main">Main Branch</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-surface-500">Compare to:</span>
            <select className="input py-2 w-40">
              <option value="previous">Previous period</option>
              <option value="lastYear">Same period last year</option>
              <option value="none">No comparison</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="stat-label">Total Sales</p>
            <p className="stat-value">$42,600</p>
            <div className="stat-change up mt-2">
              <TrendingUp className="w-3 h-3" />
              +15.2% vs last period
            </div>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">142</p>
            <div className="stat-change up mt-2">
              <TrendingUp className="w-3 h-3" />
              +8.5% vs last period
            </div>
          </div>
          <div className="stat-card">
            <p className="stat-label">Avg. Order Value</p>
            <p className="stat-value">$300</p>
            <div className="stat-change up mt-2">
              <TrendingUp className="w-3 h-3" />
              +5.1% vs last period
            </div>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Profit</p>
            <p className="stat-value text-success-600">$12,800</p>
            <div className="stat-change up mt-2">
              <TrendingUp className="w-3 h-3" />
              +18.3% vs last period
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-surface-900">Sales Trend</h3>
                <p className="text-sm text-surface-500 mt-0.5">Daily sales over time</p>
              </div>
            </div>
            <div className="card-body p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Orders Trend */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-surface-900">Orders Trend</h3>
                <p className="text-sm text-surface-500 mt-0.5">Daily order count</p>
              </div>
            </div>
            <div className="card-body p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line type="monotone" dataKey="orders" stroke="#d946ef" strokeWidth={2} dot={{ fill: '#d946ef', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Product Performance Table */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-surface-900">Product Performance</h3>
              <p className="text-sm text-surface-500 mt-0.5">Top selling products by revenue</p>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Export</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-right">Units Sold</th>
                  <th className="text-right">Revenue</th>
                  <th className="text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {productPerformance.map((product) => (
                  <tr key={product.name}>
                    <td>
                      <span className="font-medium text-surface-900">{product.name}</span>
                    </td>
                    <td className="text-right">
                      <span className="font-mono">{product.sales}</span>
                    </td>
                    <td className="text-right">
                      <span className="font-mono font-semibold">${product.revenue.toLocaleString()}</span>
                    </td>
                    <td className="text-right">
                      <span className={clsx(
                        'inline-flex items-center gap-1 font-mono',
                        product.growth > 0 ? 'text-success-600' : 'text-error-600'
                      )}>
                        {product.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}