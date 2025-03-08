
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
};

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);

  // Fetch waitlist on mount
  useEffect(() => {
    refreshWaitlist();
  }, []);

  const refreshWaitlist = async (): Promise<void> => {
    // This is a simulation. In a real app, this would be a fetch to an API
    // Here we're simulating reading from the waitlist.txt file
    try {
      // In a demo, we'll just simulate some data
      const mockData: WaitlistEntry[] = [
        { email: "john.doe@example.com", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { email: "jane.smith@example.com", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { email: "mike.johnson@example.com", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
      ];
      
      setWaitlistEntries(mockData);
    } catch (error) {
      console.error("Error fetching waitlist:", error);
    }
  };

  const joinWaitlist = async (email: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add to our local state for demo purposes
      const newEntry = {
        email,
        date: new Date().toISOString()
      };
      
      setWaitlistEntries(prev => [...prev, newEntry]);
      
      // In a real app, this would be a server-side API call
      // For this demo, we'll simulate a successful API response
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
    <WaitlistContext.Provider value={{ joinWaitlist, loading, waitlistEntries, refreshWaitlist }}>
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
