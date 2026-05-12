const API_BASE = 'https://inventorypro-production-86d5.up.railway.app/api'

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`)
    if (!res.ok) throw new Error('API Error')
    return res.json()
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('API Error')
    return res.json()
  },

  auth: {
    login: (email: string, password: string) =>
      fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).then(r => r.json()),

    register: (email: string, password: string, name: string) =>
      fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      }).then(r => r.json()),
  },

  products: {
    list: () => fetch(`${API_BASE}/products`).then(r => r.json()),
    get: (id: number) => fetch(`${API_BASE}/products/${id}`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  },

  sales: {
    list: () => fetch(`${API_BASE}/sales`).then(r => r.json()),
    create: (data: any) => fetch(`${API_BASE}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  },
}

export const API_URL = API_BASE