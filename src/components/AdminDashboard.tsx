
import React, { useState, useEffect } from 'react';
import { useWaitlist } from './WaitlistContext';
import { useAdmin } from './AdminContext';
import { LogOut, RefreshCw, Search, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export default function AdminDashboard() {
  const { waitlistEntries, refreshWaitlist, waitlistCount } = useWaitlist();
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshWaitlist();
    setIsRefreshing(false);
  };

  const filteredEntries = waitlistEntries.filter(entry => 
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-finance-400 to-finance-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <h1 className="text-2xl font-bold">Altero Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-finance-600/20 p-2 rounded-full text-finance-500">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Waitlist Management</h2>
                <p className="text-gray-400 text-sm">
                  View and manage waitlist sign-ups 
                  <span className="ml-2 bg-finance-600/20 px-2 py-0.5 rounded-full text-finance-500 text-xs font-medium">
                    {waitlistCount} {waitlistCount === 1 ? 'subscriber' : 'subscribers'}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 px-4 py-2 rounded-lg transition-colors"
                disabled={isRefreshing}
              >
                <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800/50 border border-white/10 text-white rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-finance-600/50 transition-all"
              />
            </div>
          </div>

          <div className="bg-dark-900 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map((entry, index) => (
                      <tr key={index} className="hover:bg-dark-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{formatDate(entry.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-6 py-8 text-center text-gray-400">
                        {searchQuery ? (
                          <div className="flex flex-col items-center">
                            <Search size={24} className="mb-2 opacity-50" />
                            <p>No results found for "{searchQuery}"</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <UserPlus size={24} className="mb-2 opacity-50" />
                            <p>No waitlist entries yet</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 Altero. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
