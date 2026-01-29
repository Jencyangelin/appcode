
export interface UserProfile {
  id: string;
  fullName: string;
  jobTitle: string;
  company: string;
  industry: string; // Added field
  skills: string;   // Added field
  email: string;
  phone: string;
  website: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
  };
  avatarUrl: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  isAuthenticated: boolean;
}

export interface AppState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
