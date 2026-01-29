
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './views/Landing';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ProfileEdit from './views/ProfileEdit';
import PublicCard from './views/PublicCard';
import Scanner from './views/Scanner';
import Explore from './views/Explore';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('qrsync_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Debug: Expose storage info to window for console access
  useEffect(() => {
    (window as any).debugStorage = {
      checkProfiles: () => {
        console.log("=== LOCAL STORAGE DEBUG ===");
        const allKeys = Object.keys(localStorage);
        console.log("All localStorage keys:", allKeys);
        
        // Check for profile keys
        allKeys.forEach(key => {
          if (key.includes('profile') || key.includes('qrsync')) {
            try {
              const value = localStorage.getItem(key);
              console.log(`✓ ${key}:`, JSON.parse(value!));
            } catch (e) {
              const val = localStorage.getItem(key);
              console.log(`✓ ${key}:`, val);
            }
          }
        });

        // Check for user
        const userStr = localStorage.getItem('qrsync_user');
        console.log("User ID:", userStr ? JSON.parse(userStr).id : "No user");
        
        return {
          allKeys,
          user: userStr ? JSON.parse(userStr) : null,
          profiles: allKeys
            .filter(k => k.includes('profile'))
            .map(k => ({ key: k, value: JSON.parse(localStorage.getItem(k)!) }))
        };
      },
      getUserId: () => {
        const userStr = localStorage.getItem('qrsync_user');
        return userStr ? JSON.parse(userStr).id : null;
      },
      getProfile: (id?: string) => {
        const userId = id || (window as any).debugStorage.getUserId();
        const key = `profile_${userId}`;
        const value = localStorage.getItem(key);
        console.log(`Getting profile with key: ${key}`);
        console.log("Value:", value ? JSON.parse(value) : "NOT FOUND");
        return value ? JSON.parse(value) : null;
      },
      clearAllProfiles: () => {
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
          if (key.includes('profile')) {
            localStorage.removeItem(key);
            console.log(`Deleted: ${key}`);
          }
        });
        console.log("All profiles cleared");
      }
    };
    
    console.log("🔍 Debug storage available - Use: window.debugStorage.checkProfiles()");
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('qrsync_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('qrsync_user');
  };

  const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
    if (!user) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        {/* Completely Public Views */}
        <Route path="/card/:id" element={<PublicCard />} />
        
        {/* App Shell Views */}
        <Route path="/" element={
          <Layout user={user} onLogout={handleLogout}>
            <Landing />
          </Layout>
        } />

        <Route path="/explore" element={
          <Layout user={user} onLogout={handleLogout}>
            <Explore />
          </Layout>
        } />

        <Route path="/login" element={
          <Layout user={user} onLogout={handleLogout}>
            <Login onLogin={handleLogin} />
          </Layout>
        } />

        {/* Protected Views */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard user={user} />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <Layout user={user} onLogout={handleLogout}>
              <ProfileEdit user={user} />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/scan" element={
          <ProtectedRoute>
            <Scanner />
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
