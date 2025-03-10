
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      // Fetch waitlist data from Supabase
      const { data, error, count } = await supabase
        .from('waitlist')
        .select('email, created_at', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our expected format
      const entries: WaitlistEntry[] = data?.map(entry => ({
        email: entry.email,
        date: entry.created_at
      })) || [];
      
      setWaitlistEntries(entries);
      setWaitlistCount(count || entries.length);
      
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      
      // Fall back to mock data if Supabase query fails
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
      // Insert the new entry into Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);
      
      if (error) {
        // Check if it's a unique constraint violation (email already exists)
        if (error.code === '23505') {
          toast({
            title: "Already registered",
            description: "This email is already on our waitlist.",
            variant: "destructive",
          });
          return false;
        }
        throw error;
      }
      
      // Refresh the waitlist to get the latest entries
      await refreshWaitlist();
      
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
