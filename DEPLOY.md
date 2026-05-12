# InventoryPro Deployment Package

## Quick Deploy Options

---

### Option 1: Vercel (Recommended - Free)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy frontend:
```bash
cd client
vercel
```
Follow prompts, then done!

3. Deploy backend separately (or use Vercel Serverless Functions)

---

### Option 2: Netlify (Free)

1. Drag & drop `client/dist` to https://app.netlify.com/drop

Or use CLI:
```bash
npm i -g netlify-cli
cd client
netlify deploy --prod
```

---

### Option 3: Railway (Good for Backend)

1. Go to https://railway.app
2. Connect GitHub repo
3. Deploy server with PostgreSQL add-on
4. Set environment variables

---

### Option 4: Render (Free Tier Available)

1. Go to https://render.com
2. Create Web Service for backend
3. Create PostgreSQL database
4. Deploy with environment variables

---

### Option 5: DigitalOcean App Platform

1. Go to https://digitalocean.com
2. Create App
3. Connect repository
4. Configure build commands and environment

---

### Option 6: Traditional VPS (Apache/Nginx)

#### Frontend (Nginx):
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/inventorypro/client/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Backend (PM2 + Nginx):
```bash
# Install PM2
npm i -g pm2

# Start backend
cd server
pm2 start dist/index.js --name inventory-api

# Configure Nginx reverse proxy
```

---

## Environment Variables

### Backend (.env)
```
PORT=3001
DATABASE_URL=postgres://user:pass@host:5432/inventorypro
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

### Frontend
If using API proxy, add to `vite.config.ts`:
```js
server: {
  proxy: {
    '/api': 'https://your-backend-domain.com'
  }
}
```

---

## PostgreSQL Setup

### Local
```bash
createdb inventorypro
psql -d inventorypro -f server/src/config/schema.sql
```

### Cloud (Free tiers)
- Supabase (https://supabase.com) - PostgreSQL + Auth
- Neon (https://neon.tech) - Serverless PostgreSQL
- Railway - PostgreSQL add-on

---

## One-Click Deploy Buttons

### Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

### Render
[![Deploy to Render](https://render.com/image/deploy-to-render-button.svg)](https://render.com/deploy)

---

## Post-Deployment Checklist

- [ ] Set up PostgreSQL database and run migrations
- [ ] Update API base URL in frontend
- [ ] Configure JWT_SECRET in production
- [ ] Set up SSL certificate (HTTPS)
- [ ] Test all modules (Sales, Purchase, Inventory, Accounts)
- [ ] Verify authentication flow
- [ ] Test export functionality
- [ ] Check mobile responsiveness

---

## Default Admin Login
```
Email: admin@inventorypro.com
Password: admin123
```

⚠️ **Change password immediately after deployment!**

---

## Support

For enterprise deployment or customization, contact development team.