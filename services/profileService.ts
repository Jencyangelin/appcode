import { UserProfile } from "../types";
import { backendAPI } from "./backendAPI";

export const profileService = {
  async saveProfile(profile: UserProfile): Promise<void> {
    // Try backend first
    const backendSuccess = await backendAPI.saveProfile(profile);

    // Fallback to localStorage
    if (!backendSuccess) {
      const profiles = this.getAllProfiles();
      profiles[profile.id] = profile;
      localStorage.setItem("qrsync_profiles", JSON.stringify(profiles));
      console.log("Profile saved to localStorage (backend unavailable)");
    } else {
      console.log("Profile saved to backend");
    }
  },

  async getProfile(id: string): Promise<UserProfile | null> {
    // Try backend first
    let profile = await backendAPI.getProfile(id);

    // Fallback to localStorage
    if (!profile) {
      const profiles = this.getAllProfiles();
      profile = profiles[id] || null;
      if (profile) {
        console.log("Profile loaded from localStorage (backend unavailable)");
      }
    } else {
      console.log("Profile loaded from backend");
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
