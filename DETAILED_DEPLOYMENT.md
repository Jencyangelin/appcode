# 🖼️ Step-by-Step Deployment with Details

## STEP 1: Prepare Your Code for Deployment

### Make sure `.gitignore` is correct

Create/update `.gitignore`:

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

### Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - QRSync app"

# Create repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/qrcode.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Backend to Railway

### 2.1 Create Railway Account

1. Go to **[railway.app](https://railway.app)**
2. Click **"Start a New Project"**
3. Sign up with GitHub

### 2.2 Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Authorize Railway to access your GitHub
3. Select your `qrcode` repository
4. Click **"Deploy"**

### 2.3 Wait for Deployment

Railway will:

- ✅ Detect `server.js`
- ✅ Install dependencies
- ✅ Start the server
- ✅ Assign a public URL

This takes 2-3 minutes.

### 2.4 Get Your Backend URL

1. Go to Railway Dashboard
2. Click on your project
3. Look for "Deployment" section
4. Find the public URL (looks like):
   ```
   https://qrsync-prod-a1b2c3d4.railway.app
   ```
5. **Save this URL** - you'll need it soon!

### 2.5 Test Your Backend

Open this in your browser:

```
https://qrsync-prod-a1b2c3d4.railway.app/api/health
```

You should see:

```json
{
  "status": "ok",
  "timestamp": "2026-01-28T10:30:45.123Z",
  "port": 4000
}
```

✅ **Backend is live!**

---

## STEP 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"**
3. Use your GitHub account

### 3.2 Import Your Repository

1. Click **"Add New"** button
2. Select **"Project"**
3. Click **"Import Git Repository"**
4. Find and select `qrcode` repo
5. Click **"Import"**

### 3.3 Configure Environment Variables

**IMPORTANT!** Before deploying:

1. You'll see **"Configure Project"** page
2. Scroll to **"Environment Variables"**
3. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://qrsync-prod-a1b2c3d4.railway.app` (your Railway URL)
4. Click **"Add"**

### 3.4 Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (2-3 minutes)
3. You'll see success message ✅

### 3.5 Get Your Frontend URL

Vercel will show you the deployment URL:

```
https://qrsync.vercel.app
```

**Save this URL** - this is your public app!

### 3.6 Test Your Frontend

1. Open `https://qrsync.vercel.app` in browser
2. You should see your app loaded
3. Open DevTools (F12)
4. Go to Console tab
5. Should see: `🔗 API Base URL: https://qrsync-prod-a1b2c3d4.railway.app`

✅ **Frontend is live!**

---

## STEP 4: Update QR Code for Production

Your QR code is currently pointing to localhost. Update it:

### 4.1 Edit Dashboard.tsx

Open `src/views/Dashboard.tsx` and find this line:

```typescript
const getCardQRData = () => {
  return `http://localhost:3001/#/card/${user.id}`;
};
```

Replace it with:

```typescript
const getCardQRData = () => {
  return `https://qrsync.vercel.app/#/card/${user.id}`;
};
```

### 4.2 Push to GitHub

```bash
git add src/views/Dashboard.tsx
git commit -m "Update QR URL to production Vercel URL"
git push origin main
```

### 4.3 Vercel Auto-Deploys

- Vercel detects your push
- Automatically rebuilds and deploys
- Takes ~1 minute
- Check Vercel Dashboard to confirm

✅ **QR code updated!**

---

## STEP 5: Test Everything End-to-End

### Test 1: Create Profile (Desktop)

1. Go to `https://qrsync.vercel.app`
2. Click "Login" (use any email/password)
3. Go to Dashboard
4. Click "Edit Card"
5. Fill in your details:
   - Full Name
   - Job Title
   - Company
   - Email
   - Phone
   - etc.
6. Click "Save"
7. Should see success message ✅

### Test 2: Generate QR (Desktop)

1. Back on Dashboard
2. Look for "QR Code Display" section
3. See your profile QR code
4. It should be a clear, scannable QR code ✓

### Test 3: Scan QR (Mobile)

1. Open your phone camera app
2. Point at the QR code on desktop
3. A notification should appear
4. Tap it or use your browser to scan
5. Should open: `https://qrsync.vercel.app/#/card/[your-id]`
6. Your profile should load and display! 🎉

### Test 4: Share QR Globally

1. Download the QR code (click "Save PNG")
2. Send to a friend in another country
3. Have them scan it
4. Your profile should display on their phone! 🌍

---

## 🔍 Debugging Guide

### If Backend URL Not Working

1. Go to Railway Dashboard
2. Click on your project
3. Check "Deployments" section
4. Look for any errors in logs
5. Common issues:
   - Node.js version incompatibility
   - Missing `server.js`
   - Port already in use

### If Frontend Not Loading

1. Go to Vercel Dashboard
2. Click on your project
3. Check "Deployments" → latest deployment
4. Click to see build logs
5. Look for errors during build
6. Common issues:
   - TypeScript errors
   - Missing dependencies
   - Node modules not installed

### If QR Not Scanning

1. Make sure QR is clear (no pixelation)
2. Regenerate QR after updating URL
3. Test with online QR reader first
4. Check if camera permissions allowed on phone

### If Profile Not Loading on Mobile

1. Check backend is online:
   ```
   https://your-backend-url.railway.app/api/health
   ```
2. Create profile on desktop first
3. Check browser console (DevTools) for errors
4. Verify CORS is enabled in `server.js`

---

## 📊 Monitoring Your Deployment

### Railway Dashboard

- View real-time logs
- Monitor CPU/Memory usage
- Check database size
- See recent deployments

### Vercel Dashboard

- View build history
- Monitor page performance
- Check environment variables
- See deployment preview URLs

---

## 🔄 Future Updates

After initial deployment, updating is easy:

1. **Make changes locally**
2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
3. **Auto-redeploy happens automatically!**
   - Frontend redeploys on Vercel
   - Backend redeploys on Railway
4. **Changes go live in 2-5 minutes**

No manual steps needed! 🎉

---

## ✅ You're All Set!

Your QR Code app is now:

- 🌍 Live on the internet
- 📱 Scannable from any device
- 🔄 Auto-updates on git push
- 🚀 Production-ready

**Share your QR code with anyone - they can scan it from anywhere!**
