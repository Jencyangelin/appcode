# 🚀 Deploy QRSync to Cloud - Complete Guide

## Overview

You'll deploy:

1. **Backend** (Express server) → Railway or Render
2. **Frontend** (React app) → Vercel

Both will be publicly accessible and your QR codes will work worldwide!

---

## 🎯 Step 1: Deploy Backend to Railway (RECOMMENDED)

### Why Railway?

- ✅ Free tier for testing
- ✅ Auto-deploys from GitHub
- ✅ Simple setup (5 minutes)
- ✅ Persistent file storage

### A. Push Code to GitHub

If not done already:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/qrcode.git
git branch -M main
git push -u origin main
```

### B. Deploy to Railway

1. Go to **[railway.app](https://railway.app)**

2. Click **"Start a New Project"**

3. Select **"Deploy from GitHub repo"**

4. Authorize GitHub and select your `qrcode` repository

5. Railway detects `server.js` automatically ✓

6. Wait for deployment (2-3 minutes)

7. You'll get a public URL like:

   ```
   https://qrsync-prod-xyz.railway.app
   ```

8. **Test it:**
   ```
   https://qrsync-prod-xyz.railway.app/api/health
   ```
   Should show:
   ```json
   { "status": "ok", "timestamp": "2026-01-28T...", "port": 4000 }
   ```

✅ **Backend is now live!**

---

## 🎨 Step 2: Deploy Frontend to Vercel

### Why Vercel?

- ✅ Optimized for Vite/React
- ✅ Auto-deploys on git push
- ✅ Instant updates
- ✅ Free HTTPS

### A. Deploy to Vercel

1. Go to **[vercel.com](https://vercel.com)**

2. Click **"Add New..."** → **"Project"**

3. Select **"Import Git Repository"**

4. Find and select your `qrcode` repo

5. Vercel auto-detects Vite settings ✓

6. **Before deploying**, add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://qrsync-prod-xyz.railway.app` (your Railway URL)

7. Click **"Deploy"** and wait (2-3 minutes)

8. You'll get a URL like:
   ```
   https://qrsync.vercel.app
   ```

✅ **Frontend is now live!**

---

## 🔗 Step 3: Connect Frontend to Backend

Your app is now deployed but they need to know about each other.

### Update Environment Variable in Vercel

1. Go to **Vercel Dashboard** → **Your Project** → **Settings**

2. Go to **"Environment Variables"**

3. Add:
   - Key: `VITE_API_URL`
   - Value: `https://qrsync-prod-xyz.railway.app` (Railway URL)

4. **Redeploy**: Go to Deployments → Click latest → Redeploy

### Test Connection

1. Go to your Vercel URL
2. Create a profile
3. Check browser console (F12) for API calls
4. Should see: `🔗 API Base URL: https://qrsync-prod-xyz.railway.app`

---

## 📱 Step 4: Update QR Code URL

Now your QR code should point to your production app:

### Edit Dashboard.tsx

```typescript
// OLD (localhost):
const getCardQRData = () => {
  return `http://localhost:3001/#/card/${user.id}`;
};

// NEW (production):
const getCardQRData = () => {
  return `https://qrsync.vercel.app/#/card/${user.id}`;
};
```

### Push Changes

```bash
git add src/views/Dashboard.tsx
git commit -m "Update QR URL to production"
git push origin main
```

Vercel auto-deploys! ✅

---

## 🧪 Step 5: Test End-to-End

### Desktop Test:

1. Go to `https://qrsync.vercel.app`
2. Create a profile
3. Click "Edit Card" to fill details
4. Generate QR code
5. Save/download QR

### Mobile Test (World):

1. Scan QR code with phone camera
2. Opens `https://qrsync.vercel.app/#/card/[user-id]`
3. Profile displays! 🎉

### Verify Backend Connection:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Scan QR or load profile
4. See API call to: `https://qrsync-prod-xyz.railway.app/api/profiles/[id]`

---

## 🚨 Troubleshooting

### "Unknown Node" error?

**Cause 1: Backend not responding**

```bash
# Check backend health
curl https://qrsync-prod-xyz.railway.app/api/health
```

**Cause 2: Profile doesn't exist**

- Create profile on frontend first
- Check `profiles.json` exists on backend

**Cause 3: Wrong API URL**

- Check Vercel env vars
- Redeploy after changing

### Can't reach backend from phone?

1. Verify Railway URL is public:

   ```
   https://your-railway-url.railway.app/api/health
   ```

2. Check CORS is enabled in `server.js` ✓

3. Check backend logs in Railway dashboard

### QR code error?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Regenerate QR code
3. Make sure both servers are running

---

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Railway URL working (test /api/health)
- [ ] Frontend deployed to Vercel
- [ ] Environment variable set in Vercel
- [ ] Frontend redeployed after env change
- [ ] QR URL updated to production
- [ ] Desktop test: Create profile, generate QR
- [ ] Mobile test: Scan QR, profile displays
- [ ] Global test: Share QR with someone else

---

## 🔄 Continuous Deployment

Now that it's set up:

1. **Make changes** on your computer
2. **Commit & push** to GitHub
3. **Vercel auto-deploys** frontend (2-3 min)
4. **Railway auto-deploys** backend (2-3 min)
5. **Changes go live** automatically! ✨

No manual deployment needed anymore!

---

## 📈 Monitor Your Deployment

### Railway Dashboard:

- View logs
- Check memory/CPU usage
- See API requests in real-time
- Monitor `profiles.json` growth

### Vercel Dashboard:

- View build logs
- Monitor page performance
- Check deployment history
- See environment variables

---

## 💾 Backup Profiles

Your profiles are stored in `profiles.json` on Railway.

### Download backup:

```bash
# Connect to Railway
railway connect

# Copy profiles.json locally
cp profiles.json ~/backup-profiles.json
```

---

## 🎓 Next Advanced Steps

1. **Use real database** (MongoDB, PostgreSQL)
   - Replace `profiles.json`
   - Better for scaling

2. **Add authentication**
   - Users own their profiles
   - Private/public toggle

3. **Add analytics**
   - Track QR scans
   - View profile visits

4. **Custom domain**
   - `vercel.com` → Domains
   - Get `yourname.com`

---

## 📞 Support URLs

Keep these handy:

```
🌐 Your App:
https://qrsync.vercel.app

🔌 Your API:
https://qrsync-prod-xyz.railway.app/api

📱 QR Format:
https://qrsync.vercel.app/#/card/[user-id]

⚡ Health Check:
https://qrsync-prod-xyz.railway.app/api/health
```

---

## ✅ You're Done!

Your QR Code app is now:

- ✅ Deployed globally
- ✅ Works from any device
- ✅ Works from anywhere in the world
- ✅ Auto-updates on git push
- ✅ Professional production setup

**Share your QR code! Anyone can scan it now!** 🎉
