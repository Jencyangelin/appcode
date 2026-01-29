import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration - Allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());

// Profiles storage file
const profilesFile = path.join(__dirname, "profiles.json");

// Initialize profiles file if it doesn't exist
if (!fs.existsSync(profilesFile)) {
  fs.writeFileSync(profilesFile, JSON.stringify([]));
}

// Helper functions
const readProfiles = () => {
  try {
    const data = fs.readFileSync(profilesFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading profiles:", err);
    return [];
  }
};

const writeProfiles = (profiles) => {
  try {
    fs.writeFileSync(profilesFile, JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.error("Error writing profiles:", err);
  }
};

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

app.post("/api/profiles", (req, res) => {
  try {
    const profile = req.body;
    const profiles = readProfiles();

    // Find and update or create new
    const index = profiles.findIndex((p) => p.id === profile.id);
    if (index >= 0) {
      profiles[index] = profile;
    } else {
      profiles.push(profile);
    }

    writeProfiles(profiles);
    res.json({ success: true, profile });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

app.get("/api/profiles/:id", (req, res) => {
  try {
    const profiles = readProfiles();
    const profile = profiles.find((p) => p.id === req.params.id);

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.get("/api/profiles", (req, res) => {
  try {
    const profiles = readProfiles();
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API Health: http://localhost:${PORT}/api/health`);
});
