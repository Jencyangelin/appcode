// Mock Backend - Simulates a real server
// In production, replace this with actual API calls

import { UserProfile } from "../types";

// In-memory database (persists during session)
let profileDatabase: Record<string, UserProfile> = {};

// Initialize from localStorage on first load
const initializeDatabase = () => {
  const stored = localStorage.getItem("qrsync_profiles");
  if (stored) {
    profileDatabase = JSON.parse(stored);
  }
};

// Save to localStorage to persist
const persistDatabase = () => {
  localStorage.setItem("qrsync_profiles", JSON.stringify(profileDatabase));
};

export const mockBackend = {
  async getProfile(id: string): Promise<UserProfile | null> {
    initializeDatabase();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const profile = profileDatabase[id];
    console.log(
      `[MockBackend] Fetching profile for ${id}:`,
      profile ? "Found" : "Not found",
    );

    return profile || null;
  },

  async saveProfile(profile: UserProfile): Promise<void> {
    initializeDatabase();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    profileDatabase[profile.id] = profile;
    persistDatabase();

    console.log(`[MockBackend] Saved profile for ${profile.id}`);
  },

  async getAllProfiles(): Promise<UserProfile[]> {
    initializeDatabase();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const profiles = Object.values(profileDatabase) as UserProfile[];
    return profiles.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
};
