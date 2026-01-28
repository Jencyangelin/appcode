
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
