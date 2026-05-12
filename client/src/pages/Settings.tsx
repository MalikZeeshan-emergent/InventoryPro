import { useState } from 'react'
import {
  Settings as SettingsIcon,
  User,
  Building2,
  Bell,
  Shield,
  Globe,
  Mail,
  Users,
  Check,
  Save,
  Plus,
  Edit,
} from 'lucide-react'
import { clsx } from 'clsx'

type SettingsTab = 'general' | 'company' | 'users' | 'notifications' | 'security' | 'integrations'

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-500 mt-1">Manage your application preferences and configurations</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-surface-600 hover:bg-surface-100'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-surface-900">Business Information</h3>
                  <p className="text-sm text-surface-500 mt-0.5">Basic settings for your business</p>
                </div>
                <div className="card-body space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Business Name</label>
                      <input type="text" className="input" defaultValue="InventoryPro Demo" />
                    </div>
                    <div>
                      <label className="input-label">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input type="email" className="input pl-10" defaultValue="contact@inventorypro.com" />
                      </div>
                    </div>
                    <div>
                      <label className="input-label">Phone Number</label>
                      <input type="tel" className="input" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="input-label">Currency</label>
                      <select className="input" defaultValue="USD">
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary">
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-surface-900">Preferences</h3>
                </div>
                <div className="card-body space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-surface-100">
                    <div>
                      <p className="font-medium text-surface-900">Dark Mode</p>
                      <p className="text-sm text-surface-500">Use dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-200 rounded-full peer peer-checked:bg-primary-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-surface-900">Date Format</p>
                      <p className="text-sm text-surface-500">Choose date display format</p>
                    </div>
                    <select className="input w-40">
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-surface-900">User Management</h3>
                  <p className="text-sm text-surface-500 mt-0.5">Manage team members</p>
                </div>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4" /> Add User
                </button>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Admin User', email: 'admin@inventorypro.com', role: 'Super Admin', status: 'active' },
                      { name: 'Sarah Johnson', email: 'sarah@inventorypro.com', role: 'Manager', status: 'active' },
                      { name: 'Mike Chen', email: 'mike@inventorypro.com', role: 'Accountant', status: 'active' },
                    ].map((user, i) => (
                      <tr key={i}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-surface-900">{user.name}</p>
                              <p className="text-xs text-surface-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-primary">{user.role}</span></td>
                        <td><span className="badge badge-success">{user.status}</span></td>
                        <td><button className="p-2 rounded-lg hover:bg-surface-100"><Edit className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-surface-900">Notifications</h3>
              </div>
              <div className="card-body space-y-4">
                {[
                  { title: 'Low Stock Alerts', desc: 'Get notified when products are running low', enabled: true },
                  { title: 'Payment Reminders', desc: 'Receive alerts for due payments', enabled: true },
                  { title: 'New Orders', desc: 'Get notified when new orders are placed', enabled: true },
                ].map((n) => (
                  <div key={n.title} className="flex items-center justify-between py-3 border-b border-surface-100">
                    <div>
                      <p className="font-medium text-surface-900">{n.title}</p>
                      <p className="text-sm text-surface-500">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={n.enabled} />
                      <div className="w-11 h-6 bg-surface-200 rounded-full peer peer-checked:bg-primary-600 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-surface-900">Security</h3>
              </div>
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-surface-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-surface-600" />
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">Two-Factor Authentication</p>
                      <p className="text-sm text-surface-500">Add extra security</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Enable</button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-surface-600" />
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">Auto Backup</p>
                      <p className="text-sm text-surface-500">Daily backups enabled</p>
                    </div>
                  </div>
                  <span className="badge badge-success"><Check className="w-3 h-3 mr-1" /> Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-surface-900">Integrations</h3>
              </div>
              <div className="card-body space-y-4">
                {['QuickBooks', 'Xero', 'Shopify', 'Stripe', 'Zapier'].map((name) => (
                  <div key={name} className="flex items-center justify-between py-3 border-b border-surface-100">
                    <div>
                      <p className="font-medium text-surface-900">{name}</p>
                    </div>
                    <button className="btn btn-secondary">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="card">
              <div className="card-body">
                <p className="text-surface-500">Company settings coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}