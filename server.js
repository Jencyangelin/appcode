const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

// Data file path (works both locally and on cloud)
const dataFile = path.join(__dirname, "profiles.json");

// Helper: Load profiles from file
const loadProfiles = () => {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, "utf8"));
    }
  } catch (err) {
    console.error("Error loading profiles:", err);
  }
  return {};
};

// Helper: Save profiles to file
const saveProfiles = (profiles) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(profiles, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving profiles:", err);
  }
};

// Routes

// Get single profile by ID
app.get("/api/profiles/:id", (req, res) => {
  const profiles = loadProfiles();
  const profile = profiles[req.params.id];

  if (profile) {
    console.log(`✓ Profile fetched: ${req.params.id}`);
    res.json(profile);
  } else {
    console.log(`✗ Profile not found: ${req.params.id}`);
    res.status(404).json({ error: "Profile not found" });
  }
});

// Get all profiles (public directory)
app.get("/api/profiles", (req, res) => {
  const profiles = loadProfiles();
  const profileList = Object.values(profiles).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  res.json(profileList);
});

// Save or update profile
app.post("/api/profiles", (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Profile ID required" });
    }

    const profiles = loadProfiles();
    profiles[id] = { ...req.body, updatedAt: new Date().toISOString() };
    saveProfiles(profiles);

    console.log(`✓ Profile saved: ${id}`);
    res.json({ success: true, profile: profiles[id] });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "QRSync Backend API",
    endpoints: {
      health: "/api/health",
      getProfile: "/api/profiles/:id",
      allProfiles: "/api/profiles",
      saveProfile: "POST /api/profiles",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 QRSync Backend Server running on port ${PORT}`);
  console.log(`� Public URL: https://your-app-url.com:${PORT}`);
  console.log(`\n📂 Profiles stored in: ${dataFile}\n`);
});
