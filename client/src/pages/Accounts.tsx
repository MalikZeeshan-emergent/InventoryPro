import { useState } from 'react'
import {
  Wallet,
  Plus,
  DollarSign,
  CreditCard,
  TrendingUp,
  MoreVertical,
  Download,
  Building2,
  CheckCircle,
  X,
  ArrowRightLeft,
  FileText,
} from 'lucide-react'
import { clsx } from 'clsx'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
type TransactionStatus = 'pending' | 'completed' | 'cancelled'

interface Account {
  id: string
  code: string
  name: string
  type: AccountType
  balance: number
  isActive: boolean
}

interface Transaction {
  id: string
  date: string
  description: string
  account: string
  debit: number
  credit: number
  status: TransactionStatus
  reference: string
}

const accounts: Account[] = [
  { id: '1', code: '1001', name: 'Cash', type: 'asset', balance: 45680, isActive: true },
  { id: '2', code: '1002', name: 'Bank Account', type: 'asset', balance: 128500, isActive: true },
  { id: '3', code: '1003', name: 'Accounts Receivable', type: 'asset', balance: 34500, isActive: true },
  { id: '4', code: '2001', name: 'Accounts Payable', type: 'liability', balance: 28900, isActive: true },
  { id: '5', code: '2002', name: 'Tax Payable', type: 'liability', balance: 12400, isActive: true },
  { id: '6', code: '3001', name: 'Owner Capital', type: 'equity', balance: 200000, isActive: true },
  { id: '7', code: '4001', name: 'Sales Revenue', type: 'revenue', balance: 284500, isActive: true },
  { id: '8', code: '5001', name: 'Cost of Goods Sold', type: 'expense', balance: 168200, isActive: true },
  { id: '9', code: '5002', name: 'Operating Expenses', type: 'expense', balance: 45200, isActive: true },
]

const transactions: Transaction[] = [
  { id: '1', date: '2024-01-15', description: 'Payment received from Tech Solutions', account: 'Cash', debit: 12450, credit: 0, status: 'completed', reference: 'INV-2024-001' },
  { id: '2', date: '2024-01-15', description: 'Sales revenue recognized', account: 'Sales Revenue', debit: 0, credit: 12450, status: 'completed', reference: 'INV-2024-001' },
  { id: '3', date: '2024-01-14', description: 'Payment to Global Supplies Co', account: 'Bank Account', debit: 0, credit: 15000, status: 'completed', reference: 'PO-2024-045' },
  { id: '4', date: '2024-01-14', description: 'Inventory purchased', account: 'Cost of Goods Sold', debit: 15000, credit: 0, status: 'completed', reference: 'PO-2024-045' },
  { id: '5', date: '2024-01-13', description: 'Office rent payment', account: 'Operating Expenses', debit: 3500, credit: 0, status: 'pending', reference: 'EXP-001' },
  { id: '6', date: '2024-01-13', description: 'Cash payment for rent', account: 'Cash', debit: 0, credit: 3500, status: 'pending', reference: 'EXP-001' },
]

const monthlyData = [
  { month: 'Jan', income: 42000, expenses: 28000 },
  { month: 'Feb', income: 38000, expenses: 24000 },
  { month: 'Mar', income: 55000, expenses: 32000 },
  { month: 'Apr', income: 48000, expenses: 30000 },
  { month: 'May', income: 62000, expenses: 38000 },
  { month: 'Jun', income: 71000, expenses: 42000 },
]

export default function Accounts() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'transactions' | 'reports'>('overview')
  const [showNewTransaction, setShowNewTransaction] = useState(false)

  const totalAssets = accounts.filter((a) => a.type === 'asset').reduce((acc, a) => acc + a.balance, 0)
  const totalLiabilities = accounts.filter((a) => a.type === 'liability').reduce((acc, a) => acc + a.balance, 0)
  const totalRevenue = accounts.filter((a) => a.type === 'revenue').reduce((acc, a) => acc + a.balance, 0)
  const totalExpenses = accounts.filter((a) => a.type === 'expense').reduce((acc, a) => acc + a.balance, 0)
  const netProfit = totalRevenue - totalExpenses

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Accounts</h1>
          <p className="text-surface-500 mt-1">Double-entry accounting and financial management</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewTransaction(true)}>
            <ArrowRightLeft className="w-4 h-4" />
            New Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Assets</p>
          <p className="stat-value">${totalAssets.toLocaleString()}</p>
          <div className="stat-change up mt-2">
            <TrendingUp className="w-3 h-3" />
            +12.5%
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Liabilities</p>
          <p className="stat-value">${totalLiabilities.toLocaleString()}</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <CreditCard className="w-3 h-3" />
            Current
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Net Profit</p>
          <p className="stat-value text-success-600">${netProfit.toLocaleString()}</p>
          <div className="stat-change up mt-2">
            <DollarSign className="w-3 h-3" />
            YTD
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Cash Balance</p>
          <p className="stat-value">${(45680 + 128500).toLocaleString()}</p>
          <div className="stat-change mt-2" style={{ color: '#64748b' }}>
            <Building2 className="w-3 h-3" />
            All accounts
          </div>
        </div>
      </div>

      <div className="tabs">
        {(['overview', 'accounts', 'transactions', 'reports'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx('tab', activeTab === tab && 'active')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-surface-900">Income vs Expenses</h3>
                  <p className="text-sm text-surface-500 mt-0.5">Monthly comparison</p>
                </div>
              </div>
              <div className="card-body p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-surface-900">Account Summary</h3>
                <p className="text-sm text-surface-500 mt-0.5">By account type</p>
              </div>
              <div className="card-body p-6 space-y-4">
                {([
                  { type: 'Asset', accounts: accounts.filter((a) => a.type === 'asset'), color: 'bg-primary-500' },
                  { type: 'Liability', accounts: accounts.filter((a) => a.type === 'liability'), color: 'bg-error-500' },
                  { type: 'Equity', accounts: accounts.filter((a) => a.type === 'equity'), color: 'bg-accent-500' },
                  { type: 'Revenue', accounts: accounts.filter((a) => a.type === 'revenue'), color: 'bg-success-500' },
                  { type: 'Expense', accounts: accounts.filter((a) => a.type === 'expense'), color: 'bg-warning-500' },
                ] as const).map((group) => {
                  const total = group.accounts.reduce((acc, a) => acc + a.balance, 0)
                  return (
                    <div key={group.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-surface-600">{group.type}</span>
                        <span className="font-medium text-surface-900">${total.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div className={clsx('h-full rounded-full', group.color)} style={{ width: `${(total / totalAssets) * 100}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-surface-900">Recent Journal Entries</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all</button>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Account</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td><p className="text-surface-700">{new Date(tx.date).toLocaleDateString()}</p></td>
                      <td>
                        <p className="font-medium text-surface-900">{tx.description}</p>
                        <p className="text-xs text-surface-500">{tx.reference}</p>
                      </td>
                      <td><span className="text-surface-600">{tx.account}</span></td>
                      <td><span className="font-mono text-success-600">{tx.debit > 0 ? `$${tx.debit.toLocaleString()}` : '-'}</span></td>
                      <td><span className="font-mono text-error-600">{tx.credit > 0 ? `$${tx.credit.toLocaleString()}` : '-'}</span></td>
                      <td>
                        <span className={clsx('badge', tx.status === 'completed' ? 'badge-success' : tx.status === 'pending' ? 'badge-warning' : 'badge-error')}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'accounts' && (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Account Name</th>
                  <th>Type</th>
                  <th className="text-right">Balance</th>
                  <th>Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => {
                  const typeColors: Record<AccountType, string> = {
                    asset: 'text-primary-600',
                    liability: 'text-error-600',
                    equity: 'text-accent-600',
                    revenue: 'text-success-600',
                    expense: 'text-warning-600',
                  }
                  return (
                    <tr key={account.id} className="group">
                      <td><span className="font-mono font-medium text-surface-900">{account.code}</span></td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                            <DollarSign className={clsx('w-5 h-5', typeColors[account.type])} />
                          </div>
                          <span className="font-medium text-surface-900">{account.name}</span>
                        </div>
                      </td>
                      <td><span className={clsx('capitalize font-medium', typeColors[account.type])}>{account.type}</span></td>
                      <td className="text-right"><span className="font-mono font-semibold text-surface-900">${account.balance.toLocaleString()}</span></td>
                      <td><span className={clsx('badge', account.isActive ? 'badge-success' : 'badge-error')}>{account.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td>
                        <button className="p-2 rounded-lg hover:bg-surface-100 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Description</th>
                  <th>Account</th>
                  <th className="text-right">Debit</th>
                  <th className="text-right">Credit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td><p className="text-surface-700">{new Date(tx.date).toLocaleDateString()}</p></td>
                    <td><span className="font-mono text-sm text-surface-600">{tx.reference}</span></td>
                    <td><p className="font-medium text-surface-900">{tx.description}</p></td>
                    <td><span className="text-surface-600">{tx.account}</span></td>
                    <td className="text-right"><span className="font-mono text-success-600">{tx.debit > 0 ? `$${tx.debit.toLocaleString()}` : '-'}</span></td>
                    <td className="text-right"><span className="font-mono text-error-600">{tx.credit > 0 ? `$${tx.credit.toLocaleString()}` : '-'}</span></td>
                    <td>
                      <span className={clsx('badge', tx.status === 'completed' ? 'badge-success' : tx.status === 'pending' ? 'badge-warning' : 'badge-error')}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Trial Balance', icon: FileText, desc: 'View all account balances' },
            { title: 'Profit & Loss', icon: TrendingUp, desc: 'Income statement report' },
            { title: 'Balance Sheet', icon: Wallet, desc: 'Assets and liabilities' },
            { title: 'Cash Flow', icon: DollarSign, desc: 'Cash movement analysis' },
            { title: 'Ledger Report', icon: FileText, desc: 'Detailed account transactions' },
            { title: 'Journal Entry', icon: FileText, desc: 'All journal entries' },
          ].map((report) => (
            <div key={report.title} className="card p-6 hover:shadow-elevated transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <report.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-surface-900">{report.title}</h3>
              <p className="text-sm text-surface-500 mt-1">{report.desc}</p>
            </div>
          ))}
        </div>
      )}

      {showNewTransaction && (
        <div className="modal-overlay" onClick={() => setShowNewTransaction(false)}>
          <div className="modal max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">New Journal Entry</h2>
                  <p className="text-sm text-surface-500">Double-entry transaction</p>
                </div>
              </div>
              <button onClick={() => setShowNewTransaction(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body space-y-4">
              <div>
                <label className="input-label">Date</label>
                <input type="date" className="input" />
              </div>
              <div>
                <label className="input-label">Reference</label>
                <input type="text" className="input" placeholder="e.g., INV-2024-001" />
              </div>
              <div>
                <label className="input-label">Description</label>
                <input type="text" className="input" placeholder="Enter transaction description" />
              </div>
              <div>
                <label className="input-label">Journal Entries</label>
                <div className="border border-surface-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-surface-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-surface-600">Account</th>
                        <th className="px-4 py-3 text-right font-medium text-surface-600 w-32">Debit</th>
                        <th className="px-4 py-3 text-right font-medium text-surface-600 w-32">Credit</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3">
                          <select className="input border-0 p-0 bg-transparent focus:ring-0">
                            <option value="">Select account</option>
                            {accounts.map((a) => (
                              <option key={a.id} value={a.id}>{a.code} - {a.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" className="input border-0 p-0 bg-transparent text-right font-mono focus:ring-0" placeholder="$0.00" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" className="input border-0 p-0 bg-transparent text-right font-mono focus:ring-0" placeholder="$0.00" />
                        </td>
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
                      <Plus className="w-4 h-4" /> Add Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowNewTransaction(false)}>Cancel</button>
              <button className="btn btn-primary">
                <CheckCircle className="w-4 h-4" /> Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}