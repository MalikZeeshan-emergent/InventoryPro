import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  AlertTriangle,
  Clock,
  ChevronRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const salesData = [
  { month: 'Jan', sales: 42000, purchases: 28000 },
  { month: 'Feb', sales: 38000, purchases: 24000 },
  { month: 'Mar', sales: 55000, purchases: 32000 },
  { month: 'Apr', sales: 48000, purchases: 30000 },
  { month: 'May', sales: 62000, purchases: 38000 },
  { month: 'Jun', sales: 71000, purchases: 42000 },
]

const categoryData = [
  { name: 'Electronics', value: 45, color: '#0ea5e9' },
  { name: 'Furniture', value: 25, color: '#8b5cf6' },
  { name: 'Clothing', value: 20, color: '#ec4899' },
  { name: 'Others', value: 10, color: '#6b7280' },
]

const topProducts = [
  { name: 'MacBook Pro M3', sku: 'LAP-001', stock: 45, value: '$67,500', trend: '+12%' },
  { name: 'iPhone 15 Pro', sku: 'PHN-002', stock: 120, value: '$84,000', trend: '+8%' },
  { name: 'Samsung 4K TV', sku: 'TV-003', stock: 28, value: '$22,400', trend: '+5%' },
  { name: 'AirPods Pro', sku: 'AUD-004', stock: 200, value: '$40,000', trend: '+15%' },
]

const recentTransactions = [
  { id: 'INV-2024-001', customer: 'Tech Solutions Ltd', amount: '$12,450', status: 'paid', time: '2 mins ago' },
  { id: 'INV-2024-002', customer: 'Office Depot Inc', amount: '$8,320', status: 'pending', time: '15 mins ago' },
  { id: 'PO-2024-045', supplier: 'Global Supplies Co', amount: '$15,000', status: 'received', time: '1 hour ago' },
  { id: 'INV-2024-003', customer: 'Digital Ventures', amount: '$23,500', status: 'paid', time: '2 hours ago' },
]

const alerts = [
  { type: 'warning', message: '15 products below reorder level', icon: AlertTriangle },
  { type: 'info', message: '3 invoices due for payment', icon: Clock },
  { type: 'success', message: 'Monthly target achieved: 102%', icon: TrendingUp },
]

const stats = [
  {
    label: 'Total Revenue',
    value: '$284,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Total Purchases',
    value: '$168,200',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    label: 'Inventory Value',
    value: '$456,800',
    change: '-3.1%',
    trend: 'down',
    icon: Package,
  },
  {
    label: 'Active Customers',
    value: '1,284',
    change: '+24',
    trend: 'up',
    icon: Users,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Plus className="w-4 h-4" />
            New Sale
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            New Purchase
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card group hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
                <div className={`stat-change ${stat.trend === 'up' ? 'up' : 'down'}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change} from last month
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-surface-900">Revenue Overview</h3>
              <p className="text-sm text-surface-500 mt-0.5">Sales vs Purchases trend</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-surface-600">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-500" />
                <span className="text-surface-600">Purchases</span>
              </div>
            </div>
          </div>
          <div className="card-body p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="purchases" stroke="#d946ef" strokeWidth={2} fillOpacity={1} fill="url(#colorPurchases)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-surface-900">Sales by Category</h3>
            <p className="text-sm text-surface-500 mt-0.5">Product distribution</p>
          </div>
          <div className="card-body p-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-surface-600">{cat.name}</span>
                  </div>
                  <span className="font-medium text-surface-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="card">
          <div className="card-header">
            <h3 className="font-semibold text-surface-900">Alerts & Notifications</h3>
          </div>
          <div className="card-body p-0">
            <div className="divide-y divide-surface-100">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4 hover:bg-surface-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-warning-50' :
                    alert.type === 'success' ? 'bg-success-50' : 'bg-primary-50'
                  }`}>
                    <alert.icon className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-warning-600' :
                      alert.type === 'success' ? 'text-success-600' : 'text-primary-600'
                    }`} />
                  </div>
                  <p className="text-sm text-surface-700 flex-1">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-surface-900">Top Products</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all</button>
          </div>
          <div className="card-body p-0">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th className="text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.sku}>
                      <td>
                        <div>
                          <p className="font-medium text-surface-900">{product.name}</p>
                          <p className="text-xs text-surface-500">{product.sku}</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(product.stock / 250) * 100}%` }} />
                          </div>
                          <span className="text-sm text-surface-600">{product.stock}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <span className="font-medium text-surface-900">{product.value}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="font-semibold text-surface-900">Recent Transactions</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="card-body p-0">
            <div className="divide-y divide-surface-100">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-surface-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      tx.status === 'paid' ? 'bg-success-500' :
                      tx.status === 'pending' ? 'bg-warning-500' : 'bg-primary-500'
                    }`} />
                    <div>
                      <p className="font-medium text-surface-900">{tx.id}</p>
                      <p className="text-xs text-surface-500">{tx.customer || tx.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-surface-900">{tx.amount}</p>
                    <p className="text-xs text-surface-500">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}