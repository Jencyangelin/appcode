import { UserProfile } from "../types";

// API Base URL configuration
const getAPIBaseURL = (): string => {
  // For local development on same network
  if (
    window.location.hostname.includes("192.168") ||
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:4000";
  }

  // For production - use your deployed backend URL
  const apiUrl =
    (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";
  
  // Ensure it has https://
  if (apiUrl && !apiUrl.startsWith("http")) {
    return `https://${apiUrl}`;
  }
  
  return apiUrl;
};

const API_BASE_URL = getAPIBaseURL();

console.log("🔗 API Base URL:", API_BASE_URL);
console.log(
  "🔗 Environment VITE_API_URL:",
  (import.meta as any).env?.VITE_API_URL,
);

export const backendAPI = {
  async getProfile(id: string): Promise<UserProfile | null> {
    try {
      const url = `${API_BASE_URL}/api/profiles/${id}`;
      console.log("🔍 Fetching profile from:", url);
      
      const response = await fetch(url);
      console.log("📨 Response status:", response.status);
      
      if (response.ok) {
        const profile = await response.json();
        console.log("✅ Profile loaded from backend:", profile);
        return profile;
      }
      
      console.warn("⚠️ Profile not found on backend (404)");
      return null;
    } catch (err) {
      console.error("❌ Backend fetch error:", err);
      return null;
    }
  },

  async saveProfile(profile: UserProfile): Promise<boolean> {
    try {
      const url = `${API_BASE_URL}/api/profiles`;
      console.log("💾 Saving profile to backend:", url);
      console.log("📦 Profile data:", profile);
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      console.log("📨 Save response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Profile saved to backend successfully!");
        console.log("📋 Response:", data);
        return true;
      } else {
        const error = await response.text();
        console.error("❌ Backend save failed:", response.status, error);
        return false;
      }
    } catch (err) {
      console.error("❌ Backend save error:", err);
      return false;
    }
  },

  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const url = `${API_BASE_URL}/api/profiles`;
      console.log("🔍 Fetching all profiles from:", url);
      
      const response = await fetch(url);
      if (response.ok) {
        const profiles = await response.json();
        console.log("✅ Profiles loaded:", profiles);
        return profiles;
      }
      return [];
    } catch (err) {
      console.error("❌ Error fetching profiles:", err);
      return [];
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      const url = `${API_BASE_URL}/api/health`;
      console.log("🏥 Checking backend health:", url);
      
      const response = await fetch(url);
      const isOk = response.ok;
      
      if (isOk) {
        console.log("✅ Backend is online!");
      } else {
        console.warn("⚠️ Backend health check failed:", response.status);
      }
      
      return isOk;
    } catch (err) {
      console.error("❌ Backend health check error:", err);
      return false;
    }
  },
};
