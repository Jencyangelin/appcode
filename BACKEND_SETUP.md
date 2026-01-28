# QRSync - Backend Setup Guide

## 🎯 Goal

**Anyone scanning your QR code from ANY device should see your profile instantly.**

---

## 📋 How It Works

1. **You create your profile** → Saved to backend server
2. **QR code is generated** → Contains your profile URL
3. **Anyone scans QR** → Opens your profile instantly
4. **Backend fetches data** → Shows profile to scanner

```
Your Desktop → Create Profile → Backend (Shared)
                                    ↑
                                    ↓
Phone/Tablet Scan QR → App loads → Backend (same data)
```

---

## 🚀 Quick Start (Local Testing)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Backend Server

```bash
npm run server
```

You should see:

```
🚀 QRSync Backend Server running on port 4000
```

### 3. Start Frontend (in a NEW terminal)

```bash
npm run dev
```

### 4. Test Locally

- Desktop: http://localhost:3001
- Phone on same WiFi: http://192.168.1.8:3001 (use your PC's IP)

---

## 🌐 Deploy for Global Access (Production)

To make your QR scannable from **ANYWHERE**, deploy both frontend and backend:

### **Option 1: Deploy Backend to Railway (RECOMMENDED)**

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select this repository
4. Railway automatically detects `server.js` and deploys it
5. You'll get a public URL like: `https://qrsync-prod.railway.app`

### **Option 2: Deploy Backend to Render**

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Build command: `npm install`
5. Start command: `npm run server`
6. You'll get a URL like: `https://qrsync-backend.onrender.com`

### **Option 3: Deploy Backend to Heroku**

1. Install Heroku CLI
2. Run:

```bash
heroku login
heroku create your-app-name
git push heroku main
```

---

### **Deploy Frontend to Vercel (RECOMMENDED)**

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Vercel auto-detects Vite
4. Set Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
5. Click Deploy
6. You'll get a URL like: `https://qrsync.vercel.app`

---

## 📱 Update QR Code for Production

Once deployed, update your QR code URL to point to production:

**In `Dashboard.tsx`:**

```typescript
const getCardQRData = () => {
  return `https://qrsync.vercel.app/#/card/${user.id}`;
};
```

---

## 🔧 Environment Variables

Create a `.env` file in project root:

```env
# Frontend
VITE_API_URL=https://your-backend-url.com

# Backend
PORT=4000
NODE_ENV=production
```

---

## ✅ Testing the Full Flow

### Local Test:

1. ✓ Create profile on desktop
2. ✓ Generate QR code
3. ✓ Scan from phone on same WiFi
4. ✓ Profile displays

### Production Test:

1. ✓ Deploy backend to Railway/Render
2. ✓ Deploy frontend to Vercel
3. ✓ Update QR URL to production
4. ✓ Scan from anywhere in the world
5. ✓ Profile displays! 🎉

---

## 📂 File Structure

```
server.js                 ← Backend server
profiles.json            ← Profile database
services/
  ├── backendAPI.ts      ← API client
  └── profileService.ts  ← Profile logic
views/
  ├── Dashboard.tsx      ← Create profile
  ├── PublicCard.tsx     ← View profile
  └── Scanner.tsx        ← Scan QR
```

---

## 🐛 Troubleshooting

### "Unknown Node" Error?

- Backend not running: `npm run server`
- Backend server stopped on production
- Profile ID doesn't exist in database

### QR not scanning?

- Frontend not running: `npm run dev`
- QR code too complex (shouldn't happen now)
- Phone camera permission denied

### Can't access from phone?

- Check PC IP: `ipconfig`
- Phone on same WiFi
- Backend port 4000 accessible
- Try: `http://<PC_IP>:4000/api/health`

---

## 🎓 Next Steps

1. **Test locally** with both servers running
2. **Deploy backend** to Railway/Render
3. **Deploy frontend** to Vercel
4. **Update QR URL** to production
5. **Share QR code** - anyone can scan it now!

---

## 💡 Tips

- **Always keep backend running** on production
- **Test profile fetching** with browser DevTools
- **Check profiles.json** to debug data
- **Monitor backend logs** for errors

---

Need help? Check the browser console (F12) for error messages!
