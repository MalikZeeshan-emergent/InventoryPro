# InventoryPro - FREE Deploy Guide

We'll use completely free services:
- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free tier - $5/month credit monthly)
- **Database**: Supabase (Free tier - 500MB)

---

## STEP 1: Create Accounts (5 minutes)

1. **Supabase** (for PostgreSQL database)
   - Go to: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub

2. **Railway** (for backend)
   - Go to: https://railway.app
   - Click "Login" → "Login with GitHub"

3. **Vercel** (for frontend)
   - Go to: https://vercel.com
   - Click "Sign Up" → "Continue with GitHub"

---

## STEP 2: Setup Database (5 minutes)

### On Supabase:
1. Create new project
2. Name it "inventorypro"
3. Set password (remember it!)
4. Select region (closest to you)
5. Wait for "Project ready" (2-3 mins)
6. Go to **Settings → Database**
7. Copy **Connection string** (looks like: `postgres://postgres.xxx:password@aws-0-xxx.supabase.co:5432/postgres`)

---

## STEP 3: Deploy Backend (10 minutes)

### On Railway:
1. Click "New Project" → "Deploy from GitHub repo"
2. Connect your GitHub and select the `InventoryPro` repo
3. Go to **Variables** tab and add:
   ```
   DATABASE_URL = (paste your Supabase connection string)
   JWT_SECRET = inventorypro-super-secret-key-2024-min-32-chars!!
   JWT_EXPIRES_IN = 7d
   PORT = 3001
   NODE_ENV = production
   ```
4. Go to **Settings** → **Networking**
5. Click **Generate Domain** (to get public URL like: `inventory-pro.railway.app`)

6. Copy the domain - you'll need it for frontend!

---

## STEP 4: Deploy Frontend (5 minutes)

### On Vercel:
1. Click "Add New Project"
2. Import from GitHub (select the same repo)
3. Framework: Vite (will auto-detect)
4. Build Command: `npm run build`
5. Output Directory: `client/dist`
6. Environment Variables:
   ```
   VITE_API_URL = (paste your Railway domain, e.g., https://inventory-pro.up.railway.app)
   ```
7. Click "Deploy"

---

## STEP 5: Update Default Admin Password

1. After everything is deployed, go to your app
2. Login with: `admin@inventorypro.com` / `admin123`
3. Go to Settings → Change password!

---

## Your URLs After Deploy

- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.railway.app`

---

## Need Help?

If you get stuck, just share:
1. Your Supabase connection string
2. Railway domain (when ready)
3. Vercel email (if you want me to add you as team member)

I'll do it for you!

---

## Alternative: If You Have GitHub

Push to GitHub first:
```bash
cd "D:\SaaS products\InventoryPro"
git init
git add .
git commit -m "InventoryPro v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/InventoryPro.git
git push -u origin main
```

Then connect Vercel/Railway to that repo and deploy in 1 click!