import { UserProfile } from "../types";
import { backendAPI } from "./backendAPI";

export const profileService = {
  async saveProfile(profile: UserProfile): Promise<void> {
    // Save to backend ONLY (no localStorage fallback for production)
    console.log("📤 Attempting to save profile to backend...");
    const backendSuccess = await backendAPI.saveProfile(profile);

    if (!backendSuccess) {
      console.error("❌ CRITICAL: Failed to save profile to backend!");
      throw new Error("Backend save failed - please check your API connection");
    }

    console.log("✅ Profile saved to backend successfully");
  },

  async getProfile(id: string): Promise<UserProfile | null> {
    // Always try backend first for public cards
    console.log(`🔍 Fetching profile ${id} from backend...`);
    let profile = await backendAPI.getProfile(id);

    // Only fallback to localStorage as emergency cache
    if (!profile) {
      console.warn("⚠️ Backend unavailable, checking localStorage cache...");
      const profiles = this.getAllProfiles();
      profile = profiles[id] || null;
      if (profile) {
        console.warn("⚠️ Using cached profile from localStorage");
      }
    } else {
      console.log("✅ Profile loaded from backend successfully");
    }

    return profile;
  },

  async getPublicProfiles(): Promise<UserProfile[]> {
    // Try backend first
    let profiles = await backendAPI.getAllProfiles();

    // Fallback to localStorage
    if (profiles.length === 0) {
      const stored = this.getAllProfiles();
      profiles = Object.values(stored) as UserProfile[];
      console.log("Profiles loaded from localStorage (backend unavailable)");
    } else {
      console.log("Profiles loaded from backend");
    }

    return profiles;
  },

  getAllProfiles(): Record<string, UserProfile> {
    const stored = localStorage.getItem("qrsync_profiles");
    return stored ? JSON.parse(stored) : {};
  },
};
