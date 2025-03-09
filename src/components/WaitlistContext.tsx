
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

  const updateWaitlistFile = async (entries: WaitlistEntry[]): Promise<boolean> => {
    try {
      // In a real application, this would be a server-side API call
      // For this demo, we'll simulate updating the file through localStorage
      
      // Convert entries back to file format
      const headerComments = 
        "# Waitlist Emails\n" +
        "# This file simulates a storage for email addresses\n" +
        "# In a real application, you would use a database or secure storage\n\n" +
        "# Format: email,date_added\n\n";
      
      const entryLines = entries.map(entry => `${entry.email},${entry.date}`).join('\n');
      const fileContent = headerComments + entryLines + "\n\n";
      
      // Store the updated content in localStorage as a simulation
      localStorage.setItem('waitlist-data', fileContent);
      
      // In a real app, you would make an API call here to update the actual file
      // For the demo, we'll consider this a successful update
      return true;
    } catch (error) {
      console.error("Error updating waitlist file:", error);
      return false;
    }
  };

  const joinWaitlist = async (email: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new entry
      const newEntry = {
        email,
        date: new Date().toISOString()
      };
      
      // Update local state
      const updatedEntries = [...waitlistEntries, newEntry];
      setWaitlistEntries(updatedEntries);
      setWaitlistCount(prev => prev + 1);
      
      // Update the file (simulation)
      const fileUpdated = await updateWaitlistFile(updatedEntries);
      
      if (fileUpdated) {
        console.log(`Email added to waitlist: ${email}`);
        
        toast({
          title: "Success!",
          description: "You've been added to the waitlist.",
          variant: "default",
        });
        
        return true;
      } else {
        throw new Error("Failed to update waitlist file");
      }
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
