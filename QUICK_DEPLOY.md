# ⚡ Quick Deployment - 3 Commands

## 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Deploy to cloud"
git push origin main
```

## 2️⃣ Deploy Backend

Go to **railway.app**:

1. Click "New Project"
2. Select your GitHub repo
3. Railway auto-deploys ✓
4. **Copy the URL** (e.g., `https://qrsync-xyz.railway.app`)

## 3️⃣ Deploy Frontend

Go to **vercel.com**:

1. Click "Add New Project"
2. Select your GitHub repo
3. Add Environment Variable:
   - `VITE_API_URL` = `https://qrsync-xyz.railway.app`
4. Click Deploy ✓
5. **Copy the URL** (e.g., `https://qrsync.vercel.app`)

---

## 4️⃣ Update QR Code URL

Edit `src/views/Dashboard.tsx`:

```typescript
const getCardQRData = () => {
  return `https://qrsync.vercel.app/#/card/${user.id}`;
};
```

Push to GitHub:

```bash
git add src/views/Dashboard.tsx
git commit -m "Update QR URL to production"
git push origin main
```

Vercel auto-redeploys! ✅

---

## 5️⃣ Test It

1. **Desktop**: Create profile at `https://qrsync.vercel.app`
2. **Mobile**: Scan QR code
3. **Verify**: Profile displays! 🎉

---

## 📋 Your URLs

Replace `YOUR_USERNAME` and `xyz`:

```
Frontend:   https://qrsync.vercel.app
Backend:    https://qrsync-prod-xyz.railway.app
API:        https://qrsync-prod-xyz.railway.app/api
Health:     https://qrsync-prod-xyz.railway.app/api/health
```

---

## ✅ Done!

Your QR code now works **WORLDWIDE** from ANY device! 🌍

---

## 🆘 If Something Breaks

1. Check Railway logs: Railway Dashboard → Deployments → Logs
2. Check Vercel logs: Vercel Dashboard → Deployments → Build Log
3. Test backend: Visit `https://your-backend/api/health`
4. Check env var: Vercel Settings → Environment Variables
5. Redeploy: Railway/Vercel Dashboard → Redeploy
