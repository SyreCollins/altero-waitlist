import React, { useState, useEffect } from 'react';
import { useWaitlist } from './WaitlistContext';
import { useAdmin } from './AdminContext';
import { LogOut, RefreshCw, Search, UserPlus, Users, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const { waitlistEntries, refreshWaitlist, waitlistCount } = useWaitlist();
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rawFileContent, setRawFileContent] = useState<string>('');
  const [showRawFile, setShowRawFile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchRawContent();
  }, []);

  const fetchRawContent = async () => {
    try {
      const storedContent = localStorage.getItem('waitlist-data');
      
      if (storedContent) {
        setRawFileContent(storedContent);
      } else {
        const response = await fetch('/src/data/waitlist.txt');
        const text = await response.text();
        setRawFileContent(text);
      }
    } catch (error) {
      console.error("Error fetching raw content:", error);
      setRawFileContent("Error loading waitlist file content");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshWaitlist();
    await fetchRawContent();
    setIsRefreshing(false);
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    
    try {
      // Fetch all waitlist entries for export
      const { data, error } = await supabase
        .from('waitlist')
        .select('email, created_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Convert to CSV format
      const headers = ['Email', 'Date Joined'];
      const csvData = data.map(entry => [
        entry.email,
        format(parseISO(entry.created_at), 'yyyy-MM-dd HH:mm:ss')
      ]);
      
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n');
      
      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `altero-waitlist-${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Your waitlist data has been exported to CSV.",
      });
    } catch (error) {
      console.error("Error exporting waitlist:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the waitlist data.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
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
                onClick={() => setShowRawFile(!showRawFile)}
                className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FileText size={18} />
                {showRawFile ? "Hide File" : "View File"}
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 px-4 py-2 rounded-lg transition-colors"
                disabled={isExporting || waitlistEntries.length === 0}
              >
                <Download size={18} className={isExporting ? "animate-pulse" : ""} />
                {isExporting ? "Exporting..." : "Export CSV"}
              </button>
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

          {showRawFile && (
            <div className="mb-6 bg-dark-900 rounded-xl p-4 overflow-auto">
              <h3 className="text-md font-medium mb-2 text-gray-300">
                waitlist.txt Contents:
              </h3>
              <pre className="whitespace-pre-wrap font-mono text-xs text-gray-400 leading-relaxed">
                {rawFileContent}
              </pre>
            </div>
          )}

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
