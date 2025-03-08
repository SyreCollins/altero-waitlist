
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

type WaitlistEntry = {
  email: string;
  date: string;
};

type WaitlistContextType = {
  joinWaitlist: (email: string) => Promise<boolean>;
  loading: boolean;
  waitlistEntries: WaitlistEntry[];
  refreshWaitlist: () => Promise<void>;
  waitlistCount: number;
};

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [waitlistCount, setWaitlistCount] = useState(0);

  // Fetch waitlist on mount
  useEffect(() => {
    refreshWaitlist();
  }, []);

  const refreshWaitlist = async (): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // Here we're simulating reading from the waitlist.txt file
      const response = await fetch('/src/data/waitlist.txt');
      const text = await response.text();
      
      // Parse the text file
      const entries: WaitlistEntry[] = [];
      const lines = text.split('\n');
      
      for (const line of lines) {
        // Skip comments and empty lines
        if (line.trim() === '' || line.startsWith('#')) {
          continue;
        }
        
        const [email, date] = line.split(',');
        if (email && date) {
          entries.push({ email: email.trim(), date: date.trim() });
        }
      }
      
      setWaitlistEntries(entries);
      setWaitlistCount(entries.length);
      
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      
      // Fall back to mock data if file can't be loaded
      const mockData: WaitlistEntry[] = [
        { email: "john.doe@example.com", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { email: "jane.smith@example.com", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { email: "mike.johnson@example.com", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
      ];
      
      setWaitlistEntries(mockData);
      setWaitlistCount(mockData.length);
    }
  };

  const joinWaitlist = async (email: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a server-side API call to add the email to the waitlist.txt file
      // For this demo, we'll just update our local state
      const newEntry = {
        email,
        date: new Date().toISOString()
      };
      
      setWaitlistEntries(prev => [...prev, newEntry]);
      setWaitlistCount(prev => prev + 1);
      
      console.log(`Email added to waitlist: ${email}`);
      
      toast({
        title: "Success!",
        description: "You've been added to the waitlist.",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error joining waitlist:", error);
      
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WaitlistContext.Provider value={{ joinWaitlist, loading, waitlistEntries, refreshWaitlist, waitlistCount }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  
  return context;
}
