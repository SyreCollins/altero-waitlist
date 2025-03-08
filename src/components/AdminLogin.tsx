
import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  // Check if already authenticated and redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="glass-card max-w-md w-full p-8 rounded-2xl">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-finance-400 to-finance-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-white text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Altero Admin</h1>
          <p className="text-gray-400 mt-2">Sign in to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                placeholder="admin"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-finance-600 hover:bg-finance-500 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Sign In
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            <a href="/" className="text-finance-500 hover:text-finance-400">
              Return to homepage
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
