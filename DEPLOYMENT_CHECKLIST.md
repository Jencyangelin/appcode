# ✅ Cloud Deployment Checklist

Use this to track your progress through deployment!

---

## 📖 PHASE 1: Read Documentation (10 min)

- [ ] Open `START_HERE.md`
- [ ] Choose your deployment guide
- [ ] Read selected guide completely
- [ ] Understand the 6 deployment steps
- [ ] Know your target URLs

---

## 💻 PHASE 2: Prepare Code (5 min)

- [ ] Have GitHub account ready
- [ ] Install GitHub Desktop or know git commands
- [ ] Verify `server.js` exists
- [ ] Verify `package.json` has scripts
- [ ] Check `.gitignore` exists
- [ ] Check `.env.example` exists

---

## 🔀 PHASE 3: Push to GitHub (5 min)

- [ ] Initialize git repo: `git init`
- [ ] Create repository on github.com
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`
- [ ] Verify code appears on GitHub

---

## 🚂 PHASE 4: Deploy Backend to Railway (10 min)

- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your `qrcode` repository
- [ ] Wait for auto-detection of `server.js`
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for deployment
- [ ] Get public URL (railway-xyz.app)
- [ ] **SAVE THIS URL** - needed for next step
- [ ] Test: Visit `https://railway-url/api/health`
- [ ] Should show: `{"status":"ok",...}`

---

## 🌐 PHASE 5: Deploy Frontend to Vercel (10 min)

- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Add New"
- [ ] Select "Project"
- [ ] Click "Import Git Repository"
- [ ] Find and select `qrcode` repo
- [ ] See "Configure Project" page
- [ ] Find "Environment Variables" section
- [ ] Add new variable:
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: `https://railway-url-from-step-4`
- [ ] Click "Add"
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for build
- [ ] Get public URL (qrsync.vercel.app)
- [ ] **SAVE THIS URL**
- [ ] Test: Visit your Vercel URL
- [ ] Open DevTools (F12)
- [ ] Check console for: `🔗 API Base URL: https://railway-url`

---

## 📝 PHASE 6: Update QR URL (5 min)

- [ ] Open file: `src/views/Dashboard.tsx`
- [ ] Find function `getCardQRData()`
- [ ] Change line from:
  ```
  return `http://localhost:3001/#/card/${user.id}`;
  ```
  To:
  ```
  return `https://your-vercel-url.vercel.app/#/card/${user.id}`;
  ```
- [ ] Save file
- [ ] Commit: `git add . && git commit -m "Update QR URL to production"`
- [ ] Push: `git push origin main`
- [ ] Wait 1-2 minutes for Vercel to redeploy
- [ ] Verify Vercel shows successful deployment

---

## 🧪 PHASE 7: Testing (10 min)

### Desktop Test

- [ ] Go to your Vercel URL (https://qrsync.vercel.app)
- [ ] Click "Login" (use test email/password)
- [ ] Should see Dashboard
- [ ] Click "Edit Card"
- [ ] Fill in profile details:
  - [ ] Full Name
  - [ ] Job Title
  - [ ] Company
  - [ ] Email
  - [ ] Phone (optional)
  - [ ] Website (optional)
  - [ ] Bio (optional)
  - [ ] Industry (optional)
  - [ ] Skills (optional)
- [ ] Click "Save"
- [ ] Should see success message ✅
- [ ] Go back to Dashboard
- [ ] Should see QR code displayed
- [ ] QR should be clear and scannable

### Mobile Test - Same WiFi

- [ ] Get your PC's IP address:
  - [ ] Run `ipconfig` in PowerShell
  - [ ] Look for IPv4 Address (192.168.x.x)
- [ ] On phone, go to: `http://192.168.1.x:3001`
- [ ] Click "Login"
- [ ] Click "Scan Network"
- [ ] Point phone at desktop QR code
- [ ] Should scan successfully
- [ ] Should navigate to your profile page
- [ ] Profile should display all your info
- [ ] Success! ✅

### Mobile Test - Different Network

- [ ] Move to different WiFi (or use mobile data)
- [ ] Go to your Vercel URL on phone
- [ ] Click "Scan Network"
- [ ] Point at the desktop QR code
- [ ] Should work from different network ✅

### Global Test

- [ ] Send QR code to someone in another country
- [ ] Have them scan it
- [ ] Profile should load for them
- [ ] Verify it works worldwide! 🌍✅

---

## 🐛 PHASE 8: Troubleshooting (if needed)

If something doesn't work:

- [ ] Check backend is online: `https://railway-url/api/health`
- [ ] Check frontend loaded: Go to your Vercel URL
- [ ] Check DevTools for errors: Press F12
- [ ] Check Vercel deployment logs
- [ ] Check Railway deployment logs
- [ ] Verify env variable is set in Vercel
- [ ] Try clearing browser cache (Ctrl+Shift+Delete)
- [ ] Regenerate QR code after updates
- [ ] Read troubleshooting in: DEPLOYMENT_GUIDE.md

---

## 🎉 PHASE 9: Success!

- [ ] Desktop profile creation works
- [ ] QR code generates
- [ ] Phone on same WiFi can scan
- [ ] Phone on different WiFi can scan
- [ ] Global user can scan and see profile
- [ ] API calls visible in DevTools
- [ ] No console errors
- [ ] App is live worldwide!

---

## 📊 Final Verification

Your production URLs:

```
Frontend:  _________________________________
Backend:   _________________________________
QR URL:    _________________________________
```

---

## 🚀 You Did It!

- [x] App deployed to cloud
- [x] QR code works globally
- [x] Anyone can scan and view profile
- [x] Ready to share! 🎉

---

## 📝 Post-Deployment Notes

### To update your profile later:

1. Make changes on desktop
2. Go to Dashboard
3. Click "Edit Card"
4. Update info
5. Save
6. New QR automatically uses latest data

### To add features later:

1. Edit code locally
2. Test with `npm run server` + `npm run dev`
3. Push to GitHub: `git push origin main`
4. Vercel/Railway auto-redeploy
5. Changes go live automatically!

### To monitor deployment:

1. Railway Dashboard: Check logs and performance
2. Vercel Dashboard: Check deployments and performance
3. Check `profiles.json` on Railway for stored data

---

## 📞 Quick Reference

| Problem                | Solution                                |
| ---------------------- | --------------------------------------- |
| Backend not responding | Check Railway health endpoint           |
| Frontend won't load    | Check Vercel deployment logs            |
| QR not scanning        | Clear cache, regenerate QR              |
| "Unknown Node" error   | Create profile first, ensure data saved |
| Env var not working    | Redeploy Vercel after adding env var    |
| Can't reach from phone | Check WiFi connection, firewall         |

---

## ✅ You're Complete!

Go celebrate! Your QR code app is now live worldwide! 🌍🎉
