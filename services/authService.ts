
import { User } from '../types';

const USERS_KEY = 'qrsync_registered_users';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async register(email: string, password: string): Promise<User> {
    await delay(1200);
    const users = this.getRegisteredUsers();
    
    if (users.find(u => u.email === email)) {
      throw new Error("User already exists with this email.");
    }

    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      isAuthenticated: true
    };

    const updatedUsers = [...users, { ...newUser, password }];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    
    return newUser;
  },

  async login(email: string, password: string): Promise<User> {
    await delay(1000);
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  async loginWithGoogle(): Promise<User> {
    // Simulate OAuth2 flow delay
    await delay(1800);
    
    // In a real app, this would come from the Google ID Token
    const googleEmail = "google_user_" + Math.random().toString(36).substr(2, 4) + "@gmail.com";
    
    const users = this.getRegisteredUsers();
    let existingUser = users.find(u => u.email === googleEmail);

    if (!existingUser) {
      existingUser = {
        id: 'goog_' + Math.random().toString(36).substr(2, 9),
        email: googleEmail,
        isAuthenticated: true,
        isSocial: true
      };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, existingUser]));
    }

    return existingUser as User;
  },

  getRegisteredUsers(): any[] {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  }
};
