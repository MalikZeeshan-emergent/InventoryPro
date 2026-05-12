import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Wallet,
  BarChart3,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'Purchase', href: '/purchase', icon: Truck },
  { name: 'Accounts', href: '/accounts', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
]

const user = {
  name: 'Admin User',
  email: 'admin@inventorypro.com',
  role: 'Super Admin',
  avatar: null,
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-surface-950/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-surface-200 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">InventoryPro</h1>
              <p className="text-xs text-surface-500">Management System</p>
            </div>
            <button
              className="ml-auto lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>

          {/* Settings */}
          <div className="px-3 py-4 border-t border-surface-100">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
          </div>

          {/* User section */}
          <div className="px-4 py-4 border-t border-surface-100">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-surface-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                <User className="w-5 h-5 text-surface-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-surface-900">{user.name}</p>
                <p className="text-xs text-surface-500">{user.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-surface-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {userMenuOpen && (
              <div className="mt-2 py-2 bg-surface-50 rounded-xl">
                <button className="dropdown-item w-full text-error-600">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-surface-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-surface-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="search-input"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-surface-100 transition-colors">
                <Bell className="w-5 h-5 text-surface-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
              </button>

              {/* Quick actions */}
              <button className="btn btn-primary hidden sm:flex">
                <span className="text-lg">+</span>
                New Transaction
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}