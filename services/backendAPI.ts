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
  // Change this to your actual backend server URL
  const apiUrl =
    (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";
  return apiUrl;
};

const API_BASE_URL = getAPIBaseURL();

console.log("🔗 API Base URL:", API_BASE_URL);
console.log(
  "🔗 Environment VITE_API_URL:",
  (import.meta as any).env?.VITE_API_URL,
);
console.log("🔗 Full Save URL would be:", `${API_BASE_URL}/api/profiles`);

export const backendAPI = {
  async getProfile(id: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles/${id}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (err) {
      console.error("❌ Failed to fetch profile from backend:", err);
      return null;
    }
  },

  async saveProfile(profile: UserProfile): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        console.log("✓ Profile saved to backend");
        return true;
      } else {
        console.error(
          `❌ Backend returned ${response.status}:`,
          await response.text(),
        );
        return false;
      }
    } catch (err) {
      console.error("❌ Failed to save profile to backend:", err);
      return false;
    }
  },

  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (err) {
      console.error("❌ Failed to fetch profiles from backend:", err);
      return [];
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (response.ok) {
        console.log("✓ Backend is online");
        return true;
      }
      return false;
    } catch (err) {
      console.error("❌ Backend is offline:", err);
      return false;
    }
  },
};
